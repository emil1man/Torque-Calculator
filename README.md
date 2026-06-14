# Torque Calculator — Sprocket

[English](README.md) | [Русский](README_RU.md)

A toolkit for the game **Sprocket** to help you design tank engines.

---

## 📋 Features

- **Engine Calculator** — finds the recommended cylinder count (n) and displacement (V) for a compact engine that meets your target power-to-weight ratio.
- **Era Specifications** — a reference guide with approximate weight, engine power, armor (hull/turret), and armament data for light, medium, and heavy tanks across each era.
- **Dark Mode & Localization** — light/dark theme and Russian/English interface, both saved between sessions.
- **Responsive Design** — works on mobile, tablet, and desktop.

---

## 📖 Usage

### Engine Calculator

1. Navigate to the **Engine Calculator** page.
2. Select an era from the dropdown.
3. Enter your target power-to-weight ratio (HP/t).
4. Enter your tank's current mass (tons).
5. Get the recommended values: cylinder count (n) and displacement per cylinder (V).
6. Optionally, open [**SprocketTools Gear Calculator**](https://sprockettools.github.io/TopGearCalculator.html) with the values pre-filled.

### Era Specifications

1. Navigate to the **Era Specifications** page.
2. Select an era from the dropdown.
3. Each card shows approximate weight, power-to-weight ratio, hull/turret armor, and gun data — for light, medium, and heavy tanks.

---

## 🌍 Adding a New Language

1. Create `assets/i18n/xx.json` (copy `en.json` as a template).
2. Translate all values.
3. Add `'xx'` to the `supportedLanguages` array in `assets/js/lang.js`.

---

## 📜 License

MIT License. See `LICENSE` for details.

---

## 🔗 Links

- [**Sprocket on Steam**](https://store.steampowered.com/app/1674170/Sprocket/)
- [**SprocketTools Gear Calculator**](https://sprockettools.github.io/TopGearCalculator.html)
- [**Support the Author**](https://www.donationalerts.com/r/emil1man)