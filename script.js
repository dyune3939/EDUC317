/* ============================================================
   CAN WE KEEP SWIMMING? — script.js
   Contains:
     1. HAB / Water Safety chart (Section 4)
     2. Access / Inequality chart (Section 5)
     3. Pool Sustainability slider (Section 6)
   ============================================================ */

// ============================================================
// SECTION 4 — HAB / Water Safety Chart
// ============================================================
// TODO: Replace this placeholder data with real EPA HAB data
// for a location of your choice.
// Great sources:
//   • https://www.epa.gov/nutrientpollution/harmful-algal-blooms
//   • https://www.epa.gov/nutrient-policy-data/bloom-watch
//   • https://www.nccos.noaa.gov/stressor/harmful-algal-blooms/
//
// What to look for: "number of HAB events by year" OR
// "unsafe swim days" for a lake, river, or coastal area.

const habData = {
  // ↓ REPLACE with your chosen location name
  location: "Lake Erie (Example — replace with your data)",

  // ↓ REPLACE with real years from your dataset
  years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],

  // ↓ REPLACE with real HAB event counts or unsafe swim days
  events: [3, 5, 8, 6, 11, 9, 14, 12, 16, 18, 21, 19],
};

const habCtx = document.getElementById('habChart').getContext('2d');
new Chart(habCtx, {
  type: 'bar',
  data: {
    labels: habData.years,
    datasets: [{
      label: `HAB Events — ${habData.location}`,
      data: habData.events,
      backgroundColor: habData.events.map((v, i) =>
        // Color gradient: earlier years lighter, recent years more intense
        `rgba(0, 119, 182, ${0.3 + (i / habData.events.length) * 0.7})`
      ),
      borderColor: '#0077b6',
      borderWidth: 1,
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw} events reported`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of HAB Events / Unsafe Swim Days' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        title: { display: true, text: 'Year' },
        grid: { display: false }
      }
    }
  }
});


// ============================================================
// SECTION 5 — Access & Inequality Chart
// ============================================================
// TODO: Replace with real CDC data.
// Source: https://www.cdc.gov/drowning/data/index.html
// Look for: "percentage of people who cannot swim" by race/ethnicity
// or drowning rates by demographic group.
//
// CDC key stats (as of ~2023):
//   • Black Americans drown at ~1.5x the rate of white Americans
//   • ~40% of Black children cannot swim vs ~15% of white children
// Use these as a starting point and cite the exact CDC page.

const accessCtx = document.getElementById('accessChart').getContext('2d');
new Chart(accessCtx, {
  type: 'bar',
  data: {
    labels: ['Black Americans', 'Hispanic Americans', 'White Americans', 'Asian Americans'],
    datasets: [
      {
        label: '% Who Cannot Swim (Estimated)',
        // ↓ REPLACE with real CDC percentages
        data: [40, 37, 15, 32],
        backgroundColor: [
          'rgba(193, 68, 14, 0.8)',
          'rgba(233, 196, 106, 0.85)',
          'rgba(0, 119, 182, 0.7)',
          'rgba(45, 106, 79, 0.75)',
        ],
        borderWidth: 0,
        borderRadius: 8,
      }
    ]
  },
  options: {
    indexAxis: 'y', // Horizontal bar chart — easier to read labels
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ~${ctx.raw}% cannot swim`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Estimated % Who Cannot Swim' },
        grid: { color: 'rgba(0,0,0,0.06)' }
      },
      y: {
        grid: { display: false }
      }
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
