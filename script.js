(() => {
  "use strict";

  // ===== CONFIG =====
  const PROXIES = [
    u => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
    u => "https://corsproxy.io/?url=" + encodeURIComponent(u),
    u => "https://api.codetabs.com/v1/proxy/?quest=" + encodeURIComponent(u),
    u => "https://cors-anywhere.herokuapp.com/" + u,
    u => "https://proxy.cors.sh/" + u
  ];

  const PROTECTION_SIGNATURES = [
    "contextmenu","oncontextmenu","preventdefault","keydown",
    "keycode==123","keycode == 123","f12","devtools","debugger",
    "console.clear","document.onkeydown","event.button==2",
    "event.button == 2","selectstart","user-select","disable-devtool",
    "devtools-detector","rightclick","oncopy","onpaste","oncut",
    "view-source","sourceprotect","self==top","top!=self",
    "framebusting","atob(","eval(atob","fromcharcode"
  ];

  const ENTITY_MAP = {
    "&lt;":"<","&gt;":">","&amp;":"&","&quot;":"\"",
    "&#39;":"'","&#x2F;":"/","&#x3D;":"=","&#58;":":","&nbsp;":" "
  };

  const EVENT_ATTRS = [
    /oncontextmenu\s*=\s*["'][^"']*["']/gi,
    /oncopy\s*=\s*["'][^"']*["']/gi,
    /onpaste\s*=\s*["'][^"']*["']/gi,
    /oncut\s*=\s*["'][^"']*["']/gi,
    /onselectstart\s*=\s*["'][^"']*["']/gi,
    /ondragstart\s*=\s*["'][^"']*["']/gi,
    /onkeydown\s*=\s*["'][^"']*["']/gi
  ];

  const SCRIPT_BLOCKS = [
    /<script[^>]*>[^<]*?devtools[^<]*?<\/script>/gis,
    /<script[^>]*>[^<]*?console\.clear[^<]*?<\/script>/gis,
    /<script[^>]*>[^<]*?contextmenu[^<]*?<\/script>/gis,
    /<script[^>]*>[^<]*?keycode\s*==\s*123[^<]*?<\/script>/gis,
    /<script[^>]*>[^<]*?framebusting[^<]*?<\/script>/gis
  ];

  const FRAME_BUSTERS = [
    /if\s*\(\s*self\s*==\s*top\s*\)[^;]*;/gi,
    /if\s*\(\s*top\s*!=\s*self\s*\)[^;]*;/gi,
    /if\s*\(\s*window\.top\s*!==\s*window\.self\s*\)[^;]*;/gi,
    /top\.location\s*=\s*self\.location[^;]*;/gi
  ];

  const TAG_REGEX = /<\s*([a-zA-Z][a-zA-Z0-9:_-]*)\b/g;
  const UNICODE_REGEX = /\\u([0-9a-fA-F]{4})/g;
  const BASE64_REGEX = /atob\(\s*["']([A-Za-z0-9+/=]{16,})["']\s*\)/g;

  const RES_SCRIPT = /<script[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const RES_CSS    = /<link[^>]+href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const RES_IMG    = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const RES_SRC    = /<(video|audio|source|iframe)[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const RES_FONT   = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;

  const MAX_SUBRESOURCES = 60;
  const FETCH_CONCURRENCY = 5;

  // ===== DOM =====
  const $ = id => document.getElementById(id);
  const ui = {
    device: $("device"),
    url: $("url"),
    run: $("run"),
    status: $("status"),
    err: $("err"),
    log: $("log"),
    tagCount: $("tagCount"),
    tags: $("tags"),
    source: $("source"),
    copy: $("copy"),
    download: $("download"),
    fullToggle: $("fullToggle")
  };

  const tabBtns = document.querySelectorAll(".tab");
  const tabPanels = document.querySelectorAll(".panel-tab");

  let currentSource = "";
  let running = false;

  // ===== TABS =====
  function switchTab(name) {
    tabBtns.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    tabPanels.forEach(p => {
      const isActive = p.id === "tab-" + name;
      if (isActive) {
        p.classList.remove("active");
        void p.offsetWidth;
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
  }

  tabBtns.forEach(t => {
    t.addEventListener("click", () => switchTab(t.dataset.tab));
  });

  // ===== DEVICE GUARD =====
  function detectDevice() {
    const ua = navigator.userAgent || "";
    const platform = navigator.platform || "";
    const isIOS = /iPad|iPhone|iPod/.test(ua) ||
                  (platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isMac = /Mac/.test(platform) && !isIOS;
    const isAndroid = /Android/.test(ua);
    const isWindows = /Win/.test(platform);

    let name = "unknown";
    if (isIOS) name = "iOS";
    else if (isAndroid) name = "Android";
    else if (isMac) name = "macOS";
    else if (isWindows) name = "Windows";
    else if (/Linux/.test(platform)) name = "Linux";

    const screenInfo = `${screen.width}x${screen.height}@${window.devicePixelRatio}x`;
    const touch = navigator.maxTouchPoints || 0;
    return { isIOS, name, screen: screenInfo, touch };
  }

  const device = detectDevice();
  ui.device.textContent = `THIẾT BỊ: ${device.name} · ${device.screen} · touch=${device.touch}`;

  // ===== HELPERS =====
  function normalizeURL(input, base) {
    let v = (input || "").trim();
    if (!v) return null;
    if (v.startsWith("data:") || v.startsWith("javascript:") ||
        v.startsWith("#") || v.startsWith("mailto:")) return null;
    try {
      const u = base ? new URL(v, base) : new URL(v.includes("://") ? v : "https://" + v);
      if (!["http:", "https:"].includes(u.protocol)) return null;
      if (!u.hostname) return null;
      return u.toString();
    } catch { return null; }
  }

  async function fetchWithFallback(url) {
    let lastErr = null;
    for (let i = 0; i < PROXIES.length; i++) {
      try {
        const res = await fetch(PROXIES[i](url), {
          method: "GET",
          headers: { "Accept": "*/*" },
          cache: "no-store",
          redirect: "follow"
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (text && text.length > 0) return text;
      } catch (e) { lastErr = e; }
    }
    throw new Error("Toàn bộ proxy thất bại: " + (lastErr?.message || "không rõ"));
  }

  function isProtected(src) {
    const lower = src.toLowerCase();
    return PROTECTION_SIGNATURES.some(sig => lower.includes(sig));
  }

  function stripEventAttrs(src, log) {
    let out = src;
    for (const re of EVENT_ATTRS) {
      const next = out.replace(re, "");
      if (next !== out) { out = next; log.push("ĐÃ XÓA THUỘC TÍNH CHẶN SỰ KIỆN"); }
    }
    return out;
  }

  function stripScriptBlocks(src, log) {
    let out = src;
    for (const re of SCRIPT_BLOCKS) {
      const next = out.replace(re, "");
      if (next !== out) { out = next; log.push("ĐÃ XÓA KHỐI SCRIPT BẢO VỆ"); }
    }
    return out;
  }

  function decodeEntities(src, log) {
    let out = src, changed = false;
    for (const [k, v] of Object.entries(ENTITY_MAP)) {
      if (out.includes(k)) { out = out.split(k).join(v); changed = true; }
    }
    if (changed) log.push("ĐÃ GIẢI MÃ HTML ENTITIES");
    return out;
  }

  function decodeUnicode(src, log) {
    if (!src.includes("\\u")) return src;
    const out = src.replace(UNICODE_REGEX, (_, hex) => {
      const code = parseInt(hex, 16);
      try { return String.fromCharCode(code); } catch { return _; }
    });
    if (out !== src) log.push("ĐÃ GIẢI MÃ UNICODE ESCAPE");
    return out;
  }

  function decodeBase64(src, log) {
    const out = src.replace(BASE64_REGEX, (match, b64) => {
      try {
        const decoded = atob(b64);
        if (/^[\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]+$/.test(decoded)) return decoded;
        return match;
      } catch { return match; }
    });
    if (out !== src) log.push("ĐÃ GIẢI MÃ BASE64 BLOCK");
    return out;
  }

  function stripFrameBusters(src, log) {
    let out = src, changed = false;
    for (const re of FRAME_BUSTERS) {
      const next = out.replace(re, "");
      if (next !== out) { out = next; changed = true; }
    }
    if (changed) log.push("ĐÃ XÓA FRAME BUSTER");
    return out;
  }

  function extractTags(src) {
    if (!src) return [];
    const seen = new Set();
    const result = [];
    TAG_REGEX.lastIndex = 0;
    let m;
    while ((m = TAG_REGEX.exec(src)) !== null) {
      const name = m[1].toLowerCase();
      if (!seen.has(name)) { seen.add(name); result.push(name); }
    }
    return result;
  }

  function extractResources(html, baseURL) {
    const urls = new Set();
    const collect = (regex, groupIdx) => {
      regex.lastIndex = 0;
      let m;
      while ((m = regex.exec(html)) !== null) {
        const abs = normalizeURL(m[groupIdx], baseURL);
        if (abs) urls.add(abs);
      }
    };
    collect(RES_SCRIPT, 1);
    collect(RES_CSS, 1);
    collect(RES_IMG, 1);
    collect(RES_SRC, 2);
    collect(RES_FONT, 1);
    return [...urls];
  }

  async function fetchBatch(urls, log, onProgress) {
    const results = new Map();
    let done = 0;
    const total = urls.length;
    const queue = [...urls];

    async function worker() {
      while (queue.length) {
        const u = queue.shift();
        try {
          const content = await fetchWithFallback(u);
          results.set(u, content);
          log.push(`ĐÃ TẢI: ${u.slice(0, 70)}${u.length > 70 ? "..." : ""} (${content.length} ký tự)`);
        } catch (e) {
          log.push(`LỖI TẢI: ${u.slice(0, 70)} — ${e.message}`);
        } finally {
          done++;
          if (onProgress) onProgress(done, total);
        }
      }
    }

    const workers = Array.from(
      { length: Math.min(FETCH_CONCURRENCY, urls.length) },
      () => worker()
    );
    await Promise.all(workers);
    return results;
  }

  function buildFullSource(html, baseURL, resources) {
    const parts = [];
    parts.push("<!-- ============================================== -->");
    parts.push("<!-- MÃ NGUỒN GỐC ĐẦY ĐỦ 100% -->");
    parts.push(`<!-- URL GỐC: ${baseURL} -->`);
    parts.push(`<!-- THỜI ĐIỂM: ${new Date().toISOString()} -->`);
    parts.push(`<!-- TỔNG TÀI NGUYÊN CON: ${resources.size} -->`);
    parts.push("<!-- ============================================== -->\n");
    parts.push(html);
    parts.push("\n\n<!-- ============================================== -->");
    parts.push("<!-- TÀI NGUYÊN CON ĐÃ TẢI ĐẦY ĐỦ -->");
    parts.push("<!-- ============================================== -->\n");

    for (const [url, content] of resources) {
      parts.push(`\n\n<!-- ========== BẮT ĐẦU: ${url} ========== -->`);
      parts.push(content);
      parts.push(`<!-- ========== KẾT THÚC: ${url} ========== -->`);
    }
    return parts.join("\n");
  }

  // ===== UI UPDATE =====
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, c =>
      ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[c]));
  }

  function setStatus(text, spinning) {
    ui.status.innerHTML = spinning
      ? `<span class="spinner"></span>${escapeHTML(text)}`
      : escapeHTML(text);
  }

  function showError(msg) {
    ui.err.textContent = msg;
    ui.err.classList.remove("hidden");
  }

  function clearError() {
    ui.err.textContent = "";
    ui.err.classList.add("hidden");
  }

  function renderLog(lines) {
    if (!lines.length) { ui.log.innerHTML = ""; return; }
    ui.log.innerHTML = lines.map((l, i) => {
      const cls = l.includes("HOÀN TẤT") || l.includes("PHÁT HIỆN") || l.includes("ĐÃ TẢI") ? "ok"
                : l.includes("KHÔNG") || l.includes("LỖI") ? "warn" : "";
      return `<div class="${cls}" style="animation-delay:${Math.min(i * 12, 240)}ms">• ${escapeHTML(l)}</div>`;
    }).join("");
  }

  function renderTags(tags) {
    if (!tags.length) { ui.tagCount.textContent = "0"; ui.tags.innerHTML = ""; return; }
    ui.tagCount.textContent = tags.length;
    ui.tags.innerHTML = tags.map((t, i) =>
      `<span class="tag" style="animation-delay:${Math.min(i * 15, 400)}ms">${escapeHTML(t)}</span>`
    ).join("");
  }

  function renderSource(src) {
    if (!src) { ui.source.textContent = ""; currentSource = ""; return; }
    ui.source.textContent = src;
    currentSource = src;
  }

  // ===== MAIN FLOW =====
  async function run() {
    if (running) return;

    const baseURL = normalizeURL(ui.url.value);
    if (!baseURL) { showError("URL không hợp lệ"); return; }

    running = true;
    ui.run.disabled = true;
    clearError();
    currentSource = "";

    // Xóa dữ liệu cũ
    ui.log.innerHTML = "";
    ui.tags.innerHTML = "";
    ui.tagCount.textContent = "0";
    ui.source.textContent = "";

    // Chuyển sang tab NHẬT KÝ để theo dõi tiến trình
    switchTab("log");

    const log = [];
    const wantFull = ui.fullToggle ? ui.fullToggle.checked : true;

    try {
      setStatus("Đang tải HTML gốc...", true);
      log.push("BẮT ĐẦU TẢI HTML GỐC");
      renderLog(log);

      let raw = await fetchWithFallback(baseURL);
      log.push(`ĐÃ TẢI HTML GỐC: ${raw.length.toLocaleString()} ký tự`);
      renderLog(log);

      if (isProtected(raw)) {
        log.push("PHÁT HIỆN BẢO VỆ MÃ NGUỒN");
        log.push("TIẾN HÀNH BẺ KHÓA");
        raw = stripEventAttrs(raw, log);
        raw = stripScriptBlocks(raw, log);
        raw = decodeEntities(raw, log);
        raw = decodeUnicode(raw, log);
        raw = decodeBase64(raw, log);
        raw = stripFrameBusters(raw, log);
        log.push("BẺ KHÓA HOÀN TẤT");
      } else {
        log.push("KHÔNG PHÁT HIỆN BẢO VỆ MÃ NGUỒN");
      }
      renderLog(log);

      let resources = new Map();
      if (wantFull) {
        const subURLs = extractResources(raw, baseURL).slice(0, MAX_SUBRESOURCES);
        if (subURLs.length) {
          log.push(`PHÁT HIỆN ${subURLs.length} TÀI NGUYÊN CON — TIẾN HÀNH TẢI`);
          renderLog(log);
          resources = await fetchBatch(subURLs, log, (done, total) => {
            setStatus(`Đang tải tài nguyên con: ${done}/${total}`, true);
            renderLog(log);
          });
          log.push(`ĐÃ TẢI ${resources.size}/${subURLs.length} TÀI NGUYÊN CON`);
        } else {
          log.push("KHÔNG CÓ TÀI NGUYÊN CON");
        }
      }
      renderLog(log);

      const finalSource = wantFull
        ? buildFullSource(raw, baseURL, resources)
        : raw;

      setStatus(`HOÀN TẤT — ${finalSource.length.toLocaleString()} ký tự · ${resources.size} tài nguyên con`, false);
      renderTags(extractTags(raw));
      renderSource(finalSource);

      // Chuyển sang tab MÃ NGUỒN sau khi hoàn tất
      switchTab("source");
    } catch (e) {
      showError(e.message || "Lỗi không xác định");
      setStatus("Thất bại", false);
      log.push(`LỖI: ${e.message}`);
      renderLog(log);
    } finally {
      running = false;
      ui.run.disabled = false;
    }
  }

  // ===== EVENTS =====
  ui.run.addEventListener("click", run);
  ui.url.addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); run(); }
  });

  ui.copy.addEventListener("click", async () => {
    if (!currentSource) return;
    try {
      await navigator.clipboard.writeText(currentSource);
      const old = ui.copy.textContent;
      ui.copy.textContent = "ĐÃ COPY";
      setTimeout(() => { ui.copy.textContent = old; }, 1200);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = currentSource;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
      ui.copy.textContent = "ĐÃ COPY";
      setTimeout(() => { ui.copy.textContent = "COPY"; }, 1200);
    }
  });

  ui.download.addEventListener("click", () => {
    if (!currentSource) return;
    const blob = new Blob([currentSource], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "source-" + Date.now() + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  ui.url.focus();
})();
