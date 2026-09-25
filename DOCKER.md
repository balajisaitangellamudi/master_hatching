# Docker Setup & Usage Guide

This project is containerized using a multi-stage **Dockerfile** and **Docker Compose**, optimized for Linux host development with Expo (React Native & Web).

---

## 🚀 How to Run Expo Interactively (Supports Keypresses `a`, `w`, `r`)

### Option 1: Interactive Run (Recommended)

When you use `docker compose up`, Docker Compose intercepts terminal keystrokes for its own menu. To send keypresses (`a` for Android, `w` for Web, `r` to reload) directly to Expo:

```bash
docker compose run --rm --service-ports expo-dev
```

### Option 2: Run in Background & Attach

```bash
# Start container in background
docker compose up -d expo-dev

# Attach interactive terminal (press Ctrl+C or Ctrl+P, Ctrl+Q to detach)
docker attach masterhatch-expo-dev
```

---

## 📱 How to View the App

### 1. In Mobile Device (Expo Go)

- Make sure your phone and laptop are on the same Wi-Fi.
- Open **Expo Go** and scan the QR code in your terminal (using `exp://192.168.0.149:8081`).

### 2. In Android Emulator

- Start your Android Emulator on your Ubuntu computer.
- Open **Expo Go** inside the emulator.
- Enter URL manually:
  ```
  exp://localhost:8081
  ```
  _(or `exp://192.168.0.149:8081`)_.

### 3. In Web Browser

- Navigate to: **[http://localhost:8081](http://localhost:8081)**

---

## 🌐 Running on Mobile Data or Different Wi-Fi (Tunnel Mode)

If your phone is not on the same local network:

```bash
docker compose run --rm --service-ports expo-tunnel
```

---

## 🏭 Production Web Build (Nginx SPA)

```bash
docker compose up web-prod --build
```

Access at [http://localhost:3000](http://localhost:3000).

---

## 🛑 Stop Containers

```bash
docker compose down
```
