# Torque Calculator — Sprocket

[English](README.md) | [Русский](README_RU.md)

An engine specification calculator for the game **Sprocket**. This tool helps you determine the optimal engine torque and displacement based on your tank's weight and the selected era.

---

## 📋 Features

- **Engine Calculator** — calculates recommended torque and displacement based on power-to-weight ratio and tank mass.
- **Era Specifications** — a reference guide containing weight, power, armor, and armament data for each tank class across eras.
- **Dark Mode Support** — built-in light/dark theme toggle (saved in `localStorage`).
- **Localization Ready** — i18n infrastructure in place for Russian and English language support.
- **Responsive Design** — optimized for mobile devices, tablets, and desktops.
- **Material Design** — utilizes Material Icons and a modern color palette.

---

## 📖 Usage

### Engine Calculator

1. Navigate to the "Engine Calculator" page.
2. Select an era from the dropdown menu.
3. Enter your target power-to-weight ratio (HP/t).
4. Enter the current mass of your tank (in tons).
5. Get the recommended torque and displacement values instantly.

### Era Reference Guide

1. Navigate to the "Era Specifications" page.
2. Select an era from the dropdown menu.
3. Each card displays: weight, engine power, armor (hull/turret), and gun caliber.

---

## 🎨 Dark Theme

Click the moon/sun icon button in the navbar on any page to toggle the theme. Your preference is automatically saved to `localStorage`.

---

## 🌍 Localization

### Translation Structure

All interface strings are stored in JSON files:
- `assets/i18n/ru.json` — Russian
- `assets/i18n/en.json` — English

---

## 📊 Era Data

The data for the reference guide is stored in `/data/lookups/basedata.json`.

---

## 🐛 Known Limitations

- Era data is hardcoded into `basedata.json` and `dTorque.json` (manual updates may be required if game balance changes).
- Calculator fallback data is embedded directly into `data/calculator/index.html` (for offline usage support).

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🔗 Links

- **Sprocket on Steam:** [Steam](https://store.steampowered.com/app/1674170/Sprocket/)
- **Support the Creator:** [DonationAlerts](https://www.donationalerts.com/r/emil1man)