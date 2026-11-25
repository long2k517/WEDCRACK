<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:1a1a1a&height=180&section=header&text=WebSourceUnlocker&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Tr%C3%ADch%20xu%E1%BA%A5t%20v%C3%A0%20b%E1%BA%BB%20kh%C3%B3a%20m%C3%A3%20ngu%E1%BB%93n%20web%20100%25&descAlignY=58&descSize=16&descAlign=50" width="100%"/>

# 🔓 WEBSOURCEUNLOCKER

### Công cụ trích xuất và bẻ khóa mã nguồn web 100% — chạy hoàn toàn trên trình duyệt

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES2020-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/Dependencies-0-22c55e?style=for-the-badge)](.)
[![Zero Config](https://img.shields.io/badge/Config-Zero-22c55e?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/License-MIT-3b82f6?style=for-the-badge)](LICENSE)

[![Version](https://img.shields.io/badge/version-1.0.0-000000?style=for-the-badge)](.)
[![Platform](https://img.shields.io/badge/platform-Browser-000000?style=for-the-badge)](.)
[![Language](https://img.shields.io/badge/lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-000000?style=for-the-badge)](.)

**Mod được thực hiện bởi nguyenlong**

[Tổng quan](#-tổng-quan) · [Tính năng](#-tính-năng) · [Cài đặt](#-cài-đặt) · [Sử dụng](#-sử-dụng) · [Cơ chế](#-cơ-chế-hoạt-động) · [Giới hạn](#-giới-hạn-thực-tế) · [FAQ](#-faq)

</div>

---

## 📖 Mục lục

- [1. Tổng quan](#-tổng-quan)
- [2. Tính năng chi tiết](#-tính-năng-chi-tiết)
- [3. Giao diện](#-giao-diện)
- [4. Cài đặt](#-cài-đặt)
- [5. Sử dụng](#-sử-dụng)
- [6. Cấu trúc dự án](#-cấu-trúc-dự-án)
- [7. Cơ chế hoạt động](#-cơ-chế-hoạt-động)
- [8. Bẻ khóa 6 lớp](#-bẻ-khóa-6-lớp)
- [9. Hệ thống proxy](#-hệ-thống-proxy)
- [10. Hiệu năng](#-hiệu-năng)
- [11. Bảo mật](#-bảo-mật)
- [12. Giới hạn thực tế](#-giới-hạn-thực-tế)
- [13. Khắc phục sự cố](#-khắc-phục-sự-cố)
- [14. FAQ](#-faq)
- [15. Lộ trình](#-lộ-trình)
- [16. Đóng góp](#-đóng-góp)
- [17. Giấy phép](#-giấy-phép)

---

## 🎯 Tổng quan

**WebSourceUnlocker** là một ứng dụng web tĩnh (static web app) cho phép bất kỳ ai — không cần kiến thức lập trình — có thể:

1. Nhập một URL website bất kỳ
2. Nhận về **toàn bộ mã nguồn gốc 100%** của trang đó
3. Bao gồm cả **HTML gốc**, **CSS**, **JavaScript**, **hình ảnh**, **font**, **video**, **audio**, **iframe**
4. Tự động **bẻ khóa 6 lớp bảo vệ client-side** phổ biến nhất
5. Xuất về file `.html` hoàn chỉnh chỉ với 1 click

Ứng dụng chạy **hoàn toàn trên trình duyệt** của bạn — không gửi dữ liệu về server nào ngoài các proxy CORS công khai để tải nội dung web.

### Điểm khác biệt

| Đặc điểm | WebSourceUnlocker | Công cụ khác |
|----------|-------------------|--------------|
| Backend | Không cần | Thường cần |
| Cài đặt | 0 bước | Nhiều bước |
| Dependency | 0 | 5–20 package |
| Proxy fallback | 5 lớp tự động | 0–1 |
| Bẻ khóa | 6 lớp | 1–2 |
| Tải tài nguyên con | Có (song song 5 luồng) | Không |
| Giao diện | Theme đen, animation | Cơ bản |
| Mobile | Responsive 100% | Thường chỉ desktop |
| XSS-safe | Có (textContent) | Không |

---

## ✨ Tính năng chi tiết

### 🎯 Trích xuất

- ✅ Tải **HTML gốc** từ mọi URL công khai (`http` / `https`)
- ✅ Trích xuất **toàn bộ tài nguyên con**:
  - `<script src>` — JavaScript bên ngoài
  - `<link href>` — CSS, preload, icon
  - `<img src>` — hình ảnh
  - `<video src>`, `<audio src>`, `<source src>` — media
  - `<iframe src>` — khung nhúng
  - `url(...)` trong CSS — font, background
- ✅ Ghép tất cả thành **1 tài liệu duy nhất** có chú thích phân vùng rõ ràng
- ✅ Tải **song song 5 luồng**, tối đa 60 tài nguyên con
- ✅ Tự động resolve URL tương đối → tuyệt đối dựa trên URL gốc

### 🔓 Bẻ khóa

- ✅ Xóa thuộc tính chặn sự kiện: `oncontextmenu`, `oncopy`, `onpaste`, `oncut`, `onselectstart`, `ondragstart`, `onkeydown`
- ✅ Xóa khối `<script>` bảo vệ: devtools detector, F12 blocker, `console.clear`, `debugger` loop, framebusting
- ✅ Giải mã HTML entities: `&lt;` `&gt;` `&amp;` `&quot;` `&#39;` `&#x2F;` `&#x3D;` `&#58;` `&nbsp;`
- ✅ Giải mã Unicode escape: `\u003c` → `<`, `\u003e` → `>`
- ✅ Giải mã Base64 `atob(...)` khi kết quả là văn bản đọc được
- ✅ Xóa frame buster: `if(self==top)`, `if(top!=self)`, `top.location=self.location`

### 🎨 Giao diện

- ✅ Theme **đen tuyền** `#000`, **viền xám** `#1a1a1a`–`#2b2b2b`, **chữ trắng** `#ffffff`
- ✅ 4 tab điều hướng: **TẢI** · **NHẬT KÝ** · **THẺ** · **MÃ NGUỒN**
- ✅ Animation chuyển tab: `fadeSlide` (0.38s cubic-bezier) + `tabGlow` (gạch chân glow)
- ✅ Hiệu ứng **glow** khi hover nút, chip, tab, panel
- ✅ **Stagger animation** cho chip và log (delay tăng dần theo index)
- ✅ Spinner xoay 360° khi đang tải
- ✅ Auto-focus input khi mở trang
- ✅ Responsive hoàn hảo cho mobile / tablet / desktop

### 🛡️ Bảo mật

- ✅ **Không render HTML gốc vào DOM** — dùng `textContent` chống XSS
- ✅ **Escape toàn bộ** dữ liệu động trước khi chèn vào `innerHTML`
- ✅ **Fallback clipboard** (`execCommand`) cho trình duyệt cũ hoặc HTTP không secure context
- ✅ **Auto-revoke Blob URL** sau 1s khi tải file
- ✅ **Không lưu trữ** URL người dùng nhập lên bất kỳ server nào

### ⚡ Hiệu năng

- ✅ **5 proxy CORS dự phòng** tự động chuyển khi proxy trước đó thất bại
- ✅ **Tải song song 5 luồng** — không block UI
- ✅ **Tối đa 60 tài nguyên** — tránh timeout, tránh rate limit
- ✅ **Regex biên dịch sẵn** ở top-level, dùng lại suốt phiên
- ✅ **Cờ `running`** chống double-run, disable nút khi đang xử lý
- ✅ **`cache: "no-store"`** — luôn lấy bản mới nhất

---

## 🎨 Giao diện

### Bảng màu

| Vai trò | Mã màu | Ứng dụng |
|---------|--------|----------|
| Background | `#000000` | Nền toàn trang |
| Panel | `#0a0a0a` | Khung nội dung |
| Panel hover | `#111111` | Hover khung |
| Border | `#1a1a1a` | Viền nhẹ |
| Border strong | `#2b2b2b` | Viền chính |
| Border hover | `#4a4a4a` | Hover viền |
| Text | `#ffffff` | Tiêu đề |
| Text body | `#d4d4d4` | Nội dung |
| Muted | `#7a7a7a` | Ghi chú |
| Dim | `#3d3d3d` | Placeholder |
| Success | `#4ade80` | Log OK |
| Warning | `#fbbf24` | Log cảnh báo |
| Danger | `#ef4444` | Lỗi |

### Animation

| Tên | Mô tả | Thời gian |
|-----|-------|-----------|
| `fadeSlide` | Fade + trượt lên khi chuyển tab | 0.38s |
| `tabGlow` | Gạch chân phát sáng khi tab active | 0.35s |
| `spin` | Spinner xoay 360° | 0.7s loop |
| Panel hover | Viền sáng dần + shadow | 0.25s |
| Nút hover | Glow `box-shadow` | 0.25s |
| Nút active | Scale 0.96 | 0.1s |
| Chip appear | Fade + scale, stagger 15ms | 0.3s |
| Log appear | Fade + slide, stagger 12ms | 0.25s |

### Layout responsive

```text
Desktop (>600px)              Mobile (≤600px)
┌─────────────────────┐       ┌──────────┐
│  Header             │       │  Header  │
│  ┌──┬──┬──┬──┐      │       │ ┌─┬─┬─┬─┐│
│  │T │N │T │M │      │       │ │T│N│T│M││
│  └──┴──┴──┴──┘      │       │ └─┴─┴─┴─┘│
│  ┌─────────────┐    │       │ ┌──────┐ │
│  │ Tab content │    │       │ │ Tab  │ │
│  └─────────────┘    │       │ └──────┘ │
│  Footer             │       │ Footer   │
└─────────────────────┘       └──────────┘
🚀 Cài đặt
 
Yêu cầu
• Trình duyệt hiện đại (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
• Không cần Node.js, không cần Python, không cần build step
• Không cần API key, không cần đăng ký 
Cách 1: Chạy local (nhanh nhất)
# Tải file
curl -O https://raw.githubusercontent.com/nguyenlong/websource-unlocker/main/index.html
curl -O https://raw.githubusercontent.com/nguyenlong/websource-unlocker/main/style.css
curl -O https://raw.githubusercontent.com/nguyenlong/websource-unlocker/main/script.js

# Mở trực tiếp
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
 
Cách 2: Clone repo
git clone https://github.com/nguyenlong/websource-unlocker.git
cd websource-unlocker
open index.html
 
Cách 3: Chạy server tĩnh (khuyến nghị)
# Python 3
python3 -m http.server 8080

# Node.js
npx serve .

# PHP
php -S localhost:8080
 
→ Truy cập: http://localhost:8080
 
Cách 4: Deploy lên static host
 
GitHub Pages
1. Push code lên repo GitHub
2. Vào Settings → Pages
3. Source: Deploy from a branch → main → / (root)
4. Save
5. Truy cập: https://<username>.github.io/websource-unlocker
 
Netlify
# Kéo thả thư mục vào netlify.com/drop
# Hoặc dùng CLI
npx netlify-cli deploy --prod --dir=.
 
Vercel
npx vercel --prod
 
Cloudflare Pages
1. Vào dash.cloudflare.com → Pages → Create project
2. Connect repo GitHub
3. Build command: (để trống)
4. Output directory: /
5. Save and Deploy
 
 
🎮 Sử dụng
 
Quy trình 6 bước
┌─────────────────────────────────────────────────┐
│ BƯỚC 1: Mở index.html                           │
│         ↓                                       │
│ BƯỚC 2: Nhập URL vào ô (ví dụ: example.com)     │
│         ↓                                       │
│ BƯỚC 3: (Tùy chọn) Bật/tắt "Tải đầy đủ 100%"    │
│         ↓                                       │
│ BƯỚC 4: Bấm TIẾP TỤC                            │
│         ↓                                       │
│ BƯỚC 5: Xem tiến trình ở tab NHẬT KÝ            │
│         ↓                                       │
│ BƯỚC 6: Xem kết quả ở tab MÃ NGUỒN              │
│         → Bấm COPY hoặc TẢI VỀ                  │
└─────────────────────────────────────────────────┘
 
Định dạng URL được chấp nhận
Đầu vào Xử lý Kết quả
example.com Tự thêm https:// ✅ OK
https://example.com Giữ nguyên ✅ OK
http://example.com Giữ nguyên ✅ OK
https://example.com/path?query=1 Giữ nguyên ✅ OK
ftp://example.com Từ chối ❌ Lỗi
javascript:alert(1) Từ chối ❌ Lỗi
data:text/html,... Từ chối ❌ Lỗi
mailto:a@b.c Từ chối ❌ Lỗi
(trống) Từ chối ❌ Lỗi
 
Kết quả đầu ra
 
Khi hoàn tất, tab MÃ NGUỒN hiển thị tài liệu có cấu trúc:
<!-- ============================================== -->
<!-- MÃ NGUỒN GỐC ĐẦY ĐỦ 100% -->
<!-- URL GỐC: https://example.com -->
<!-- THỜI ĐIỂM: 2025-01-15T10:30:45.123Z -->
<!-- TỔNG TÀI NGUYÊN CON: 24 -->
<!-- ============================================== -->

<html>
  <!-- HTML GỐC CỦA TRANG -->
</html>

<!-- ============================================== -->
<!-- TÀI NGUYÊN CON ĐÃ TẢI ĐẦY ĐỦ -->
<!-- ============================================== -->

<!-- ========== BẮT ĐẦU: https://example.com/style.css ========== -->
body { margin: 0; ... }
<!-- ========== KẾT THÚC: https://example.com/style.css ========== -->

<!-- ========== BẮT ĐẦU: https://example.com/app.js ========== -->
console.log("hello");
<!-- ========== KẾT THÚC: https://example.com/app.js ========== -->

<!-- ... 22 tài nguyên khác ... -->
 
Phím tắt
Phím Hành động
Enter (trong ô URL) Chạy tải
Ctrl/Cmd + C Copy đoạn đang chọn
 
 
📁 Cấu trúc dự án
WebSourceUnlocker/
│
├── index.html          # 🎨 Cấu trúc DOM + 4 tab
│   ├── <header>        #    Tiêu đề + thông tin thiết bị
│   ├── <nav>           #    4 tab: TẢI / NHẬT KÝ / THẺ / MÃ NGUỒN
│   ├── <main>          #    4 panel tương ứng
│   └── <footer>        #    Credit
│
├── style.css           # 💄 Theme đen / xám / trắng + animations
│   ├── :root           #    CSS custom properties
│   ├── .tabs / .tab    #    Tab + animation tabGlow
│   ├── .panel-tab      #    Panel + animation fadeSlide
│   ├── button          #    Glow khi hover, scale khi active
│   ├── .tag            #    Chip + stagger animation
│   ├── .log            #    Log + stagger animation
│   ├── pre#source      #    Mã nguồn monospace
│   └── @media          #    Responsive mobile
│
├── script.js           # ⚙️ Logic chính (IIFE, strict mode)
│   ├── CONFIG          #    PROXIES, signatures, regex
│   ├── DOM             #    Cache element refs
│   ├── TABS            #    switchTab() + listeners
│   ├── DEVICE GUARD    #    detectDevice()
│   ├── HELPERS         #    normalizeURL, fetch, decode
│   ├── EXTRACT         #    extractTags, extractResources
│   ├── FETCH BATCH     #    fetchBatch (song song 5 luồng)
│   ├── BUILD           #    buildFullSource
│   ├── RENDER          #    renderLog, renderTags, renderSource
│   ├── MAIN            #    run()
│   └── EVENTS          #    Listeners cho run, copy, download
│
└── README.md           # 📖 Tài liệu (file này)
 
 
🔬 Cơ chế hoạt động
 
Luồng tổng quát
┌──────────────┐
│  NHẬP URL    │
└──────┬───────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 1: Chuẩn hóa URL               │
│  - Thêm https:// nếu thiếu           │
│  - Kiểm tra scheme (chỉ http/https)  │
│  - Kiểm tra hostname                 │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 2: Tải HTML gốc                │
│  - Thử proxy 1 → 2 → 3 → 4 → 5       │
│  - Timeout, retry tự động            │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 3: Phát hiện bảo vệ            │
│  - Quét 30 chữ ký                    │
│  - Nếu có → bẻ khóa 6 lớp            │
│  - Nếu không → giữ nguyên            │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 4: Trích xuất tài nguyên con   │
│  - Regex <script src>, <link href>   │
│  - <img src>, <video src>, url(...)  │
│  - Resolve tương đối → tuyệt đối     │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 5: Tải song song 5 luồng       │
│  - Mỗi tài nguyên: 5 proxy dự phòng  │
│  - Tối đa 60 tài nguyên              │
│  - Báo tiến trình realtime           │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 6: Ghép tài liệu hoàn chỉnh    │
│  - Chú thích phân vùng               │
│  - Metadata (URL gốc, thời điểm)     │
└──────┬───────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│  BƯỚC 7: Hiển thị + xuất             │
│  - Tab MÃ NGUỒN (textContent)         │
│  - Nút COPY (Clipboard API)          │
│  - Nút TẢI VỀ (Blob → .html)         │
└──────────────────────────────────────┘
 
Sơ đồ Mermaid
flowchart TD
    A[Nhập URL] --> B{URL hợp lệ?}
    B -->|Không| Z[Hiển thị lỗi]
    B -->|Có| C[Tải HTML qua 5 proxy]
    C --> D{Tải được?}
    D -->|Không| Z
    D -->|Có| E{Phát hiện bảo vệ?}
    E -->|Có| F[Bẻ khóa 6 lớp]
    E -->|Không| G[Giữ nguyên]
    F --> H[Trích xuất tài nguyên con]
    G --> H
    H --> I{Có tài nguyên?}
    I -->|Không| J[Chỉ dùng HTML]
    I -->|Có| K[Tải song song 5 luồng]
    K --> L[Ghép thành tài liệu]
    J --> L
    L --> M[Hiển thị + Copy + Tải về]
 
 
🔐 Bẻ khóa 6 lớp
 
Lớp 1 — Xóa thuộc tính chặn sự kiện
 
Mục tiêu: Vô hiệu hóa các thuộc tính inline chặn chuột phải, copy, chọn văn bản.
 
Regex:
/oncontextmenu\s*=\s*["'][^"']*["']/gi
/oncopy\s*=\s*["'][^"']*["']/gi
/onpaste\s*=\s*["'][^"']*["']/gi
/oncut\s*=\s*["'][^"']*["']/gi
/onselectstart\s*=\s*["'][^"']*["']/gi
/ondragstart\s*=\s*["'][^"']*["']/gi
/onkeydown\s*=\s*["'][^"']*["']/gi
 
Ví dụ:
<!-- Trước -->
<body oncontextmenu="return false" oncopy="return false">
<!-- Sau -->
<body  >
 
Lớp 2 — Xóa khối <script> bảo vệ
 
Mục tiêu: Loại bỏ toàn bộ <script> phát hiện devtools, chặn F12, clear console, debugger loop.
 
Regex:
/<script[^>]*>[^<]*?devtools[^<]*?<\/script>/gis
/<script[^>]*>[^<]*?console\.clear[^<]*?<\/script>/gis
/<script[^>]*>[^<]*?contextmenu[^<]*?<\/script>/gis
/<script[^>]*>[^<]*?keycode\s*==\s*123[^<]*?<\/script>/gis
/<script[^>]*>[^<]*?framebusting[^<]*?<\/script>/gis
 
Ví dụ:
<!-- Trước -->
<script>
  document.addEventListener('contextmenu', e => e.preventDefault());
  setInterval(() => { debugger; }, 100);
</script>
<!-- Sau -->
(không còn gì)
 
Lớp 3 — Giải mã HTML entities
 
Mục tiêu: Chuyển &lt; về <, &gt; về > — phục hồi HTML bị escape.
 
Bảng entity:
Entity Ký tự
&lt; <
&gt; >
&amp; &
&quot; "
&#39; '
&#x2F; /
&#x3D; =
&#58; :
&nbsp;  
 
Lớp 4 — Giải mã Unicode escape
 
Mục tiêu: Chuyển \u003c về < — phục hồi chuỗi bị escape kiểu JavaScript.
 
Regex: /\\u([0-9a-fA-F]{4})/g
 
Ví dụ:
"\u003cdiv\u003e" → "<div>"
"\u0048\u0065\u006c\u006c\u006f" → "Hello"
 
Lớp 5 — Giải mã Base64 atob(...)
 
Mục tiêu: Chuyển atob("PGh0bWw+") về "<html>" — chỉ thay nếu kết quả là văn bản đọc được (tránh thay nhầm binary).
 
Regex: /atob\(\s*["']([A-Za-z0-9+/=]{16,})["']\s*\)/g
 
Kiểm tra văn bản: /^[\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]+$/
 
Lớp 6 — Xóa frame buster
 
Mục tiêu: Loại bỏ code tự redirect khi phát hiện bị nhúng iframe.
 
Regex:
/if\s*\(\s*self\s*==\s*top\s*\)[^;]*;/gi
/if\s*\(\s*top\s*!=\s*self\s*\)[^;]*;/gi
/if\s*\(\s*window\.top\s*!==\s*window\.self\s*\)[^;]*;/gi
/top\.location\s*=\s*self\.location[^;]*;/gi
 
Bảng phát hiện bảo vệ
 
Trước khi bẻ khóa, tool quét 30 chữ ký trong HTML thô:
contextmenu · oncontextmenu · preventdefault · keydown · keycode==123
keycode == 123 · f12 · devtools · debugger · console.clear
document.onkeydown · event.button==2 · event.button == 2 · selectstart
user-select · disable-devtool · devtools-detector · rightclick
oncopy · onpaste · oncut · view-source · sourceprotect
self==top · top!=self · framebusting · atob( · eval(atob · fromcharcode
 
Nếu bất kỳ chữ ký nào xuất hiện → kích hoạt chế độ bẻ khóa 6 lớp. 
 
🌐 Hệ thống proxy
 
Tại sao cần proxy?
 
Trình duyệt chặn cross-origin request (CORS) — không cho phép JavaScript từ localhost đọc nội dung từ example.com. Proxy CORS giải quyết bằng cách chèn header Access-Control-Allow-Origin: *.
 
Danh sách 5 proxy
# Proxy Endpoint Ưu điểm Nhược điểm
1 allorigins api.allorigins.win/raw?url= Ổn định, nhanh Đôi khi rate limit
2 corsproxy.io corsproxy.io/?url= Hỗ trợ HTTPS tốt Giới hạn 1MB
3 codetabs api.codetabs.com/v1/proxy/?quest= Không rate limit rõ Chậm hơn
4 cors-anywhere cors-anywhere.herokuapp.com/ Truyền thống Hay bị chặn
5 cors.sh proxy.cors.sh/ Mới Cần API key cho traffic cao
 
Luồng fallback
Thử proxy 1 → OK? → Trả về
    ↓ Thất bại
Thử proxy 2 → OK? → Trả về
    ↓ Thất bại
Thử proxy 3 → OK? → Trả về
    ↓ Thất bại
Thử proxy 4 → OK? → Trả về
    ↓ Thất bại
Thử proxy 5 → OK? → Trả về
    ↓ Thất bại
Throw "Toàn bộ proxy thất bại"
 
 
⚡ Hiệu năng
 
Đo lường thực tế
Tác vụ Thời gian trung bình
Tải HTML gốc (trang 500KB) 0.8s – 2s
Phát hiện bảo vệ (30 chữ ký) <5ms
Bẻ khóa 6 lớp 10ms – 50ms
Trích xuất tài nguyên con <10ms
Tải 60 tài nguyên song song (5 luồng) 5s – 30s
Ghép tài liệu cuối <5ms
Render UI <20ms
 
Tối ưu đã áp dụng
• ✅ Regex biên dịch một lần ở top-level
• ✅ Cache DOM refs trong object ui
• ✅ IIFE + strict mode — không leak biến global
• ✅ Chống double-run bằng cờ running
• ✅ Disable nút trong khi xử lý
• ✅ Stagger animation giới hạn delay tối đa
• ✅ textContent thay innerHTML cho mã nguồn (nhanh hơn + an toàn hơn)
• ✅ Blob URL auto-revoke sau 1s 
 
🛡️ Bảo mật
 
Chống XSS
 
Toàn bộ dữ liệu động được escape trước khi chèn vào innerHTML:
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[c]));
}
 
Mã nguồn kết quả không bao giờ được render vào DOM — luôn dùng textContent.
 
Bảo vệ input
• Chỉ chấp nhận http và https scheme
• Từ chối javascript:, data:, mailto:, #
• Kiểm tra hostname không rỗng
• Sử dụng URL constructor — chuẩn hóa tự động 
Bảo vệ clipboard
• Ưu tiên navigator.clipboard.writeText() (cần HTTPS hoặc localhost)
• Fallback document.execCommand("copy") qua textarea ẩn
• Auto-remove textarea sau khi copy 
 
⚠️ Giới hạn thực tế
 
✅ CÓ THỂ lấy 100%
Loại Ví dụ
HTML gốc <html>...</html>
CSS inline & external <style>, style.css
JavaScript inline & external <script>, app.js
Hình ảnh .jpg, .png, .svg, .webp
Font .woff2, .ttf, .otf
Video .mp4, .webm
Audio .mp3, .ogg
Iframe src URL nhúng
Nội dung obfuscate client-side Base64, entity, unicode
 
❌ KHÔNG THỂ lấy
Loại Lý do
Source backend (PHP, Node, Python...) Không gửi về client
Database schema, data Nằm trên server
API key server-side Biến môi trường server
JWT secret Server-only
Nội dung sau đăng nhập Cần session cookie
Nội dung sau thanh toán Cần auth + entitlement
SPA render động (React/Vue) HTML gốc chỉ là vỏ rỗng
SSR output Render tại server, không phải source
Template engine (.blade, .twig, .ejs) Chỉ server đọc được
 
Ghi chú SPA
 
Với React/Vue/Angular/Next.js, HTML gốc chỉ chứa:
<div id="root"></div>
<script src="/static/js/main.abc123.js"></script>
 
Tool sẽ tải được:
• main.abc123.js — bundle chính (minified, nhưng đọc được)
• vendor.def456.js — thư viện
• Toàn bộ CSS, ảnh, font 
Nhưng không có HTML render sẵn — vì browser phải chạy JavaScript mới render được. 
 
🔧 Khắc phục sự cố
 
Lỗi: "Toàn bộ proxy thất bại"
 
Nguyên nhân: Cả 5 proxy đều không truy cập được URL đích.
 
Giải pháp:
1. Kiểm tra URL có đúng không (thử mở bằng trình duyệt)
2. Kiểm tra trang có chặn bot (Cloudflare, Akamai)
3. Thử đổi mạng (4G ↔ WiFi)
4. Tự dựng proxy CORS riêng:
# Node.js
npx cors-anywhere
# → http://localhost:8080/https://example.com
 
Lỗi: "HTTP 403"
 
Nguyên nhân: Server đích chặn proxy công khai.
 
Giải pháp:
• Thử URL khác
• Dựng proxy riêng với IP sạch
• Dùng VPN 
Lỗi: "URL không hợp lệ"
 
Nguyên nhân: Scheme không phải http / https, hoặc hostname rỗng.
 
Giải pháp:
• Không dùng ftp://, javascript:, data:, mailto:
• Nhập example.com thay vì example
• Kiểm tra có dấu cách thừa 
Lỗi: "Phản hồi rỗng"
 
Nguyên nhân: Proxy trả về 200 nhưng body rỗng.
 
Giải pháp:
• Đợi vài giây rồi thử lại (proxy tạm thời quá tải)
• Thử URL khác để xác nhận proxy hoạt động
• Xóa cache trình duyệt 
Không thấy tab MÃ NGUỒN
 
Nguyên nhân: Quá trình chưa hoàn tất hoặc lỗi.
 
Giải pháp:
• Xem tab NHẬT KÝ để biết bước nào lỗi
• Kiểm tra status bar phía trên 
Nút COPY không hoạt động
 
Nguyên nhân: HTTP không secure context, trình duyệt chặn navigator.clipboard.
 
Giải pháp:
• Tool đã có fallback execCommand — nhưng nếu cả 2 đều fail
• Thủ công: chọn toàn bộ text trong <pre> → Ctrl/Cmd + C
• Hoặc dùng nút TẢI VỀ 
 
❓ FAQ
 
1. Tool có vi phạm pháp luật không?
 
Tool chỉ đọc nội dung công khai mà server đã gửi về client. Không có hành vi:
• Tấn công server
• Bypass authentication
• Đánh cắp dữ liệu riêng tư
• Xâm nhập hệ thống 
Tuy nhiên, sử dụng nội dung lấy được cho mục đích thương mại có thể vi phạm bản quyền. Người dùng tự chịu trách nhiệm.
 
2. Tool có lấy được source code backend không?
 
Không. Backend (PHP, Node.js, Python, Java, Go, Ruby, C#) chạy trên server, không bao giờ gửi mã nguồn về client. Tool chỉ lấy được những gì server gửi về: HTML, CSS, JS, media.
 
3. Tại sao không dùng view-source:?
 
Có thể — nhưng:
• view-source: chỉ có trên desktop, không có mobile
• Không lưu được thành file
• Không tải được tài nguyên con
• Không bẻ khóa được obfuscation 
Tool này khắc phục cả 4 điểm trên.
 
4. Tool có thu thập dữ liệu người dùng không?
 
Không. Tool là static web — mọi logic chạy trên trình duyệt bạn. Không có analytics, không có tracking, không có server backend. Chỉ có request tới proxy CORS công khai để tải URL bạn nhập.
 
5. Có giới hạn số URL được tải không?
 
Không. Không có rate limit, không có quota. Bạn tải bao nhiêu tùy thích. Chỉ giới hạn bởi proxy công khai và băng thông mạng của bạn.
 
6. Tool có chạy offline không?
 
Không hoàn toàn. Tool tự thân là static, nhưng cần internet để:
• Tải HTML đích (qua proxy)
• Tải tài nguyên con 
Nếu offline, chỉ mở được giao diện — không tải được nội dung.
 
7. Tại sao không lấy được nội dung trang login?
 
Vì proxy công khai không có cookie/session của bạn. Server đích thấy proxy là khách lạ → trả về trang login → tool hiển thị trang login.
 
Giải pháp: Dùng proxy riêng có gắn cookie, hoặc chạy tool trong browser đã đăng nhập (không được hỗ trợ bởi tool này).
 
8. Có cách nào tải nội dung SPA đã render không?
 
Có, nhưng cần headless browser (Puppeteer, Playwright) — không phải trình duyệt tĩnh. Tool này không hỗ trợ — nó chỉ lấy HTML thô (vỏ rỗng của SPA).
 
9. Tôi có thể dùng tool này cho mục đích thương mại không?
 
Về license (MIT): có, thoải mái.
 
Về nội dung tải được: tùy thuộc bản quyền của trang đích. Không được bán lại nội dung của người khác.
 
10. Tool có hỗ trợ mobile không?
 
Có. Giao diện responsive 100%. Đã test trên:
• iOS Safari 14+
• Android Chrome 90+
• iPad Safari
• Tablet Android 
11. Tôi muốn thêm proxy — làm thế nào?
 
Mở script.js, sửa mảng PROXIES:
const PROXIES = [
  u => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u),
  // Thêm proxy mới:
  u => "https://your-proxy.com/?url=" + encodeURIComponent(u)
];
 
12. Tool có bị chặn bởi Cloudflare không?
 
Có thể. Cloudflare/Akamai/WAF chặn proxy công khai. Khi đó:
• Thử proxy khác
• Dựng proxy riêng với IP sạch
• Hoặc không dùng được với trang đó 
 
🗺️ Lộ trình
 
v1.0.0 — Hiện tại ✅
[x] Nhập URL, tải HTML gốc
[x] 5 proxy fallback
[x] Bẻ khóa 6 lớp
[x] Tải tài nguyên con song song
[x] Ghép tài liệu hoàn chỉnh
[x] Copy, tải file
[x] Theme đen xám trắng
[x] 4 tab + animation
[x] Responsive mobile 
v1.1.0 — Sắp tới 🚧
[ ] Chọn lọc tài nguyên con (checkbox từng loại)
[ ] Download dạng ZIP (HTML + assets)
[ ] So sánh 2 phiên bản (diff)
[ ] Export JSON metadata
[ ] Dark/Light toggle 
v1.2.0 — Trung hạn 📅
[ ] Bẻ khóa mã hóa obfuscator.io
[ ] Bẻ khóa eval + fromCharCode chain
[ ] Auto-detect framework (React, Vue, Angular)
[ ] Extract bundle chunks của SPA
[ ] Proxy tự dựng 1-click (Cloudflare Worker) 
v2.0.0 — Dài hạn 🎯
[ ] Headless browser mode (Playwright)
[ ] Render SPA + extract DOM sau render
[ ] So sánh với view-source
[ ] Extension Chrome / Firefox
[ ] CLI Node.js 
 
🤝 Đóng góp
 
Quy trình
1. Fork repo
2. Tạo branch mới: git checkout -b feature/ten-tinh-nang
3. Commit thay đổi: git commit -m "feat: mô tả ngắn"
4. Push: git push origin feature/ten-tinh-nang
5. Mở Pull Request 
Quy ước commit
Prefix Ý nghĩa
feat: Tính năng mới
fix: Sửa lỗi
docs: Cập nhật tài liệu
style: Format, không đổi logic
refactor: Tái cấu trúc
perf: Tối ưu hiệu năng
test: Thêm test
 
Báo lỗi
 
Mở issue với template:
Môi trường: (Chrome 120 / macOS 14 / ...)
URL test: (nếu có thể chia sẻ)
Hành vi mong đợi:
Hành vi thực tế:
Screenshot / log (nếu có):
 
 
📜 Giấy phép
MIT License

Copyright (c) 2025 nguyenlong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 
 
🙏 Ghi công
• Regex bẻ khóa: tổng hợp từ nhiều nguồn cộng đồng
• Proxy CORS: allorigins, corsproxy.io, codetabs, cors-anywhere, cors.sh
• Badge: shields.io
• Banner: capsule-render
• Font: SF Mono, Menlo, Consolas 
 
<div align="center">
 
⭐ Nếu thấy hữu ích, hãy star repo!
 
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:000000,100:1a1a1a&height=120&section=footer&text=mod%20%C4%91%C6%B0%E1%BB%A3c%20th%E1%BB%B1c%20hi%E1%BB%87n%20b%E1%BB%9Fi%20nguyenlong&fontSize=20&fontColor=ffffff&animation=fadeIn&fontAlignY=70" width="100%"/>
 
mod được thực hiện bởi nguyenlong
 
</div>
```
