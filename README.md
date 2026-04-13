# Can We Keep Swimming?
### EDUC 317 — Climate Justice Educational Engagement Project

An interactive, scrollable website exploring how climate change threatens the future of swimming — through water safety, equity, and infrastructure sustainability.

---

## 🗂 File Structure

```
EDUC317/
├── index.html   ← All the page sections and content
├── style.css    ← All the visual design (colors, fonts, layout)
├── script.js    ← All the charts and interactive slider
└── README.md    ← This file
```

---

## 🚀 Getting the Site Live on GitHub Pages

### Step 1 — Clone your repo to your computer
Open Terminal (Mac) or Command Prompt (Windows) and run:
```bash
git clone https://github.com/dyune3939/EDUC317.git
cd EDUC317
```

### Step 2 — Add the project files
Copy `index.html`, `style.css`, `script.js`, and `README.md` into your `EDUC317` folder.

### Step 3 — Push to GitHub
```bash
git add .
git commit -m "Add starter website files"
git push origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo on GitHub: https://github.com/dyune3939/EDUC317
2. Click **Settings** → scroll to **Pages** in the left sidebar
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch, folder **/ (root)**
5. Click **Save**

Your site will be live at:
**https://dyune3939.github.io/EDUC317/**
(takes ~1–2 minutes the first time)

---

## 📊 Data To-Do List

The site currently uses **placeholder data** marked with `// TODO` in `script.js`.
Here's exactly what to find and where:

### Section A — Water Safety (HABs)
- **What you need:** Number of harmful algal bloom events OR unsafe swim days, by year, for one location
- **Where to find it:**
  - https://www.epa.gov/nutrientpollution/harmful-algal-blooms
  - https://www.epa.gov/bloomwatch (interactive map — pick a lake near you)
  - NOAA: https://www.nccos.noaa.gov/stressor/harmful-algal-blooms/
- **What to do:** Open `script.js`, find the `habData` object, and replace the `years` and `events` arrays with your real numbers. Also update `location` to your chosen place.

### Section B — Access & Inequality
- **What you need:** % of people who cannot swim OR drowning rates by race/ethnicity
- **Where to find it:**
  - CDC drowning data: https://www.cdc.gov/drowning/data/index.html
  - USA Swimming Foundation: https://www.usaswimming.org/foundation (has specific stats on non-swimmers by race)
- **What to do:** Open `script.js`, find the `accessChart` data block, and update the `data: [40, 37, 15, 32]` line with real percentages. Update labels if needed.

### Section C — Pool Sustainability
- This section uses a **calculation model** (no dataset needed!) based on published estimates. The math is already in `script.js`. If you want to cite a source, use:
  - US Dept. of Energy: https://www.energy.gov/eere/buildings/pool-pump-systems
  - Pool & Hot Tub Alliance reports

---

## ✏️ How to Edit Content

All the **text content** lives in `index.html`.
- To change the intro title → find `<h1>Can We Keep` and edit
- To change takeaway boxes → find `<div class="takeaway-box">` and edit the paragraph
- To add a personal photo → add `<img src="your-photo.jpg">` in the personal section

All the **colors and fonts** live in `style.css`.
- Main blue: `--water: #0077b6` (change this to change the whole color scheme)
- Background cream: `--cream: #f5f0e8`

All the **chart data and slider math** live in `script.js`.
- Clearly labeled with `// TODO` comments wherever real data needs to go

---

## 📌 Sections Overview

| # | Section | Status |
|---|---------|--------|
| 1 | Intro / Hook | ✅ Done |
| 2 | Personal Connection | ✅ Done — add your own words |
| 3 | Framing Question | ✅ Done |
| 4 | Water Safety (HAB chart) | ⚠️ Needs real EPA data |
| 5 | Who Gets to Swim? (bar chart) | ⚠️ Needs real CDC data |
| 6 | Pool Sustainability (slider) | ✅ Working — uses model estimates |
| 7 | Future of Swimming | ✅ Done — edit scenarios as you like |
| 8 | Reflection | ✅ Done — personalize the closing text |
