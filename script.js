/* ============================================================
   CAN WE KEEP SWIMMING? — script.js
   Contains:
     1. Atrazine / Water Safety chart (Section 4) — REAL EPA DATA
     2. Access / Inequality chart (Section 5) — REAL CDC DATA
     3. Pool Sustainability slider (Section 6)
   ============================================================ */

// ============================================================
// SECTION 4 — Atrazine Water Contamination Chart
// ============================================================
// SOURCE: EPA Atrazine Monitoring Program (AMP), 2010–2019
// https://www.epa.gov/ingredients-used-pesticide-products/atrazine-monitoring-program-data-and-results
//
// DATA: Annual peak atrazine readings (ppb) in finished drinking water
// across ~150 community water systems in IL, KS, KY, MO, OH, TN, TX.
// Processed from raw EPA Excel files. Water type = Finished (F) only.
// EPA legal limit = 3 ppb (annual average).
// Note: individual sample spikes are frequently much higher than annual avg.
//
// CORPORATE ACCOUNTABILITY NOTE: This data was collected by Syngenta
// (atrazine's manufacturer) under a 2003 legal agreement with the EPA.
// Even their own monitoring shows repeated exceedances of the legal limit.

const years       = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

// Highest single atrazine reading recorded that year (finished drinking water, ppb)
const peakReadings = [29.57, 21.02, 15.57, 28.86, 32.03, 33.45, 23.07, 22.13, 10.07, 8.41];

// Number of individual samples that exceeded the EPA 3 ppb legal limit
const exceedances  = [136, 102, 35, 61, 71, 35, 23, 23, 15, 11];

// Average atrazine level during May (spring spike, ppb) — peak runoff season
const mayMeans     = [2.205, 1.011, 1.242, 0.738, 2.465, 1.261, 1.428, 1.589, 0.907, 1.136];

// EPA legal limit reference line
const EPA_LIMIT = 3;

const habCtx = document.getElementById('habChart').getContext('2d');
new Chart(habCtx, {
  type: 'bar',
  data: {
    labels: years,
    datasets: [
      {
        label: 'Peak atrazine reading (ppb)',
        data: peakReadings,
        backgroundColor: peakReadings.map(v =>
          v > EPA_LIMIT ? 'rgba(193, 68, 14, 0.75)' : 'rgba(0, 119, 182, 0.6)'
        ),
        borderColor: peakReadings.map(v =>
          v > EPA_LIMIT ? '#c1440e' : '#0077b6'
        ),
        borderWidth: 1,
        borderRadius: 5,
        yAxisID: 'y',
      },
      {
        label: 'May average atrazine (ppb) — spring runoff spike',
        data: mayMeans,
        type: 'line',
        borderColor: '#e9c46a',
        backgroundColor: 'rgba(233,196,106,0.15)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#e9c46a',
        tension: 0.3,
        yAxisID: 'y',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.datasetIndex === 0)
              return ` Peak: ${ctx.raw} ppb${ctx.raw > EPA_LIMIT ? ' ⚠ exceeds EPA limit' : ''}`;
            return ` May avg: ${ctx.raw} ppb`;
          }
        }
      },
      annotation: {
        annotations: {
          limitLine: {
            type: 'line',
            yMin: EPA_LIMIT,
            yMax: EPA_LIMIT,
            borderColor: 'rgba(193,68,14,0.6)',
            borderWidth: 2,
            borderDash: [6, 4],
            label: {
              display: true,
              content: 'EPA legal limit (3 ppb)',
              position: 'end',
              color: '#c1440e',
              font: { size: 11 }
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Atrazine concentration (ppb)' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        title: { display: true, text: 'Year' },
        grid: { display: false }
      }
    }
  }
});

// Exceedances sub-display (samples over 3ppb each year)
// Injected as a small note below the chart via DOM
const exceedanceNote = document.createElement('p');
exceedanceNote.style.cssText = 'font-size:0.82rem; color:#666; margin-top:0.5rem; font-style:italic;';
exceedanceNote.innerHTML =
  '<strong style="color:#c1440e">Samples exceeding EPA limit per year:</strong> ' +
  years.map((y, i) => `${y}: <strong>${exceedances[i]}</strong>`).join(' · ');
document.getElementById('habChart').parentElement.after(exceedanceNote);


// ============================================================
// SECTION 5 — Access & Inequality Chart
// ============================================================
// SOURCE: CDC Vital Signs, May 2024
// "Drowning Death Rates, Self-Reported Swimming Skill, Swimming Lesson
//  Participation, and Recreational Water Exposure — United States, 2019–2023"
// https://www.cdc.gov/vitalsigns/drowning/index.html
// https://www.cdc.gov/mmwr/volumes/73/wr/mm7320e1.htm
//
// CHART A: % of adults who report NOT knowing how to swim, by race
// CHART B: % who have NEVER taken a swimming lesson, by race
//
// All figures are directly from CDC 2024 Vital Signs report.

const accessCtx = document.getElementById('accessChart').getContext('2d');
new Chart(accessCtx, {
  type: 'bar',
  data: {
    labels: ['Hispanic adults', 'Black adults', 'All U.S. adults', 'Other race/ethnicity', 'White adults'],
    datasets: [
      {
        label: '% who have never taken a swimming lesson (CDC 2024)',
        data: [72, 63, 55, 53, 48],
        backgroundColor: [
          'rgba(193, 68, 14, 0.85)',
          'rgba(193, 68, 14, 0.7)',
          'rgba(0, 119, 182, 0.5)',
          'rgba(0, 119, 182, 0.6)',
          'rgba(0, 119, 182, 0.75)',
        ],
        borderWidth: 0,
        borderRadius: 6,
      }
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw}% have never taken a swimming lesson`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: '% who have never taken a swimming lesson' },
        grid: { color: 'rgba(0,0,0,0.06)' }
      },
      y: { grid: { display: false } }
    }
  }
});


// ============================================================
// SECTION 6 — Pool Sustainability Slider
// ============================================================
// Model explanation:
//   A typical residential pool pump uses ~2,500 kWh/year for a
//   ~20,000 gallon pool. We scale linearly from there.
//   Water: pools lose ~15–20% of their volume per year to
//   evaporation, splash-out, and backwashing. We use 15%.
//
// These are simplified estimates — you can cite:
//   • Pool & Hot Tub Alliance (PHTA) energy reports
//   • US Dept. of Energy: https://www.energy.gov/eere/buildings/pool-pump-systems

const BASELINE_GALLONS = 20000;      // Reference pool size
const BASELINE_KWH     = 2500;       // kWh/year for baseline pool
const WATER_LOSS_RATE  = 0.15;       // 15% of pool volume lost/year
const EFFICIENT_FACTOR = 0.70;       // Efficient systems use ~30% less energy

const slider        = document.getElementById('poolSlider');
const poolGallonsEl = document.getElementById('poolGallons');
const energyEl      = document.getElementById('energyOutput');
const waterEl       = document.getElementById('waterOutput');
const efficientEl   = document.getElementById('efficientOutput');

function updateSlider() {
  const gallons = parseInt(slider.value);

  // Display pool size with comma formatting
  poolGallonsEl.textContent = gallons.toLocaleString();

  // Energy: scale linearly from baseline
  const energy = Math.round(BASELINE_KWH * (gallons / BASELINE_GALLONS));

  // Water: 15% of pool volume per year
  const water = Math.round(gallons * WATER_LOSS_RATE);

  // Efficient system energy
  const efficient = Math.round(energy * EFFICIENT_FACTOR);

  energyEl.textContent    = energy.toLocaleString();
  waterEl.textContent     = water.toLocaleString();
  efficientEl.textContent = efficient.toLocaleString();
}

// Initialize on page load + update on drag
updateSlider();
slider.addEventListener('input', updateSlider);
