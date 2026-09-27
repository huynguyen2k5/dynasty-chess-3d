# 🐉 Dynasty Chess 3D (Kỳ Vương Tam Quốc)

> **Đỉnh Cao Cờ Tướng 3D Online & Offline • Tuyệt Kỹ Danh Tướng Trợ Chiến**

Nền tảng Web Cờ Tướng chiến thuật thời gian thực tích hợp công nghệ đồ họa 3D WebGL (Three.js), luật thi đấu chuẩn quốc tế WXF, trí tuệ nhân tạo Minimax Alpha-Beta Pruning và hệ thống Danh Tướng Tam Quốc 3D tương tác sống động.

---

## 🏛️ Kiến Trúc Monorepo

* **`frontend-public/`**: Next.js 15 (App Router), Three.js 3D Canvas, Tailwind CSS, Lucide Icons, Framer Motion.
  * *Bàn Cờ 3D Sơn Mài Tử Đàn & Khảm Vàng 2048x2276*
  * *Quân cờ Huyết Ngọc Chu Sa & Huyền Bích Thạch*
  * *Tứ Đại Danh Tướng 3D: Gia Cát Lượng, Quan Vũ, Tào Tháo, Lữ Bố*
  * *Chế độ chơi: Bot AI Minimax 4 cấp độ, Đấu trường PvP Xếp Hạng ELO, Cờ Thế Tam Quốc, Pass & Play*
* **`backend/`**: Python FastAPI (Uvicorn ASGI, WebSockets thời gian thực, Redis Pub/Sub, SQLAlchemy Async, Engine luật cờ WXF).
* **`frontend-admin/`**: React + Vite (Dashboard Quản trị, Giám sát ván cờ, Hệ thống Anti-Cheat & Bảng vàng).

---

## 🚀 Khởi Chạy Nhanh (Local Development)

### 1. Khởi động Frontend Public (Next.js 15)
```bash
cd frontend-public
npm install
npm run dev
```
Truy cập giao diện chính tại: `http://localhost:3000`

### 2. Khởi động Backend (FastAPI & WebSocket)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation tại: `http://localhost:8000/docs`

### 3. Khởi động Database & Cache (Docker)
```bash
docker compose up -d
```

### 4. Khởi động Frontend Admin
```bash
cd frontend-admin
npm install
npm run dev
```

---

## 📜 Giấy Phép & Bản Quyền
Bản quyền © 2026 **Dynasty Chess 3D**. Bảo lưu mọi quyền.
