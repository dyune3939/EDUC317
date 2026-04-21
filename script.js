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
const BASELINE_GALLONS = 20000;
const BASELINE_KWH     = 2500;
const WATER_LOSS_RATE  = 0.15;
const EFFICIENT_FACTOR = 0.70;

const slider        = document.getElementById('poolSlider');
const poolGallonsEl = document.getElementById('poolGallons');
const energyEl      = document.getElementById('energyOutput');
const waterEl       = document.getElementById('waterOutput');
const efficientEl   = document.getElementById('efficientOutput');

function updateSlider() {
  const gallons = parseInt(slider.value);
  poolGallonsEl.textContent = gallons.toLocaleString();
  const energy    = Math.round(BASELINE_KWH * (gallons / BASELINE_GALLONS));
  const water     = Math.round(gallons * WATER_LOSS_RATE);
  const efficient = Math.round(energy * EFFICIENT_FACTOR);
  energyEl.textContent    = energy.toLocaleString();
  waterEl.textContent     = water.toLocaleString();
  efficientEl.textContent = efficient.toLocaleString();
}
updateSlider();
slider.addEventListener('input', updateSlider);

// ============================================================
// SECTION 7 — The Double Burden: Bubble Chart
// ============================================================
// SOURCE: Trust for Public Land City Park Facts 2023 (pools per 100k)
//         US Census ACS 2022 (% people of color, median household income)
//         Swimply / TPL analysis: swimply.com/blog/post/cities-with-the-fewest-community-pools-per-capita
//
// ARGUMENT: Cities with the highest % of residents of color have the
// fewest public pools per capita. The same communities face contaminated
// natural water AND no safe pool alternative. This is the double burden.
//
// X axis: % residents of color (Census ACS 2022)
// Y axis: public pools per 100,000 residents (TPL 2023)
// Bubble size: median household income (larger = higher income)
// Color: red = high atrazine/water contamination risk, blue = lower risk

const cityData = [
  // [city, pools_per_100k, pct_poc, median_hhi, contamination_risk, show_label]
  // contamination_risk: 'high' | 'medium' | 'low'
  ['Cleveland, OH',    10.8, 67, 32000,  'medium', true],
  ['Cincinnati, OH',    7.9, 56, 40000,  'medium', true],
  ['Atlanta, GA',       7.7, 74, 59000,  'low',    true],
  ['Pittsburgh, PA',    7.2, 36, 53000,  'low',    false],
  ['Minneapolis, MN',   4.8, 40, 66000,  'high',   false],
  ['St. Paul, MN',      4.1, 49, 60000,  'high',   false],
  ['Washington DC',     3.9, 59, 90000,  'low',    false],
  ['Chicago, IL',       3.2, 67, 63000,  'high',   true],
  ['Philadelphia, PA',  2.9, 59, 53000,  'low',    false],
  ['New York, NY',      2.1, 68, 70000,  'low',    false],
  ['Detroit, MI',       1.9, 82, 34000,  'medium', true],
  ['Boston, MA',        1.8, 47, 81000,  'low',    false],
  ['Baltimore, MD',     1.7, 72, 54000,  'low',    false],
  ['Memphis, TN',       1.5, 76, 43000,  'high',   true],
  ['St. Louis, MO',     1.4, 55, 46000,  'high',   true],
  ['Dallas, TX',        1.2, 76, 54000,  'medium', false],
  ['Kansas City, MO',   1.1, 48, 57000,  'high',   false],
  ['Los Angeles, CA',   0.9, 73, 72000,  'low',    false],
  ['Houston, TX',       0.8, 76, 62000,  'medium', true],
  ['San Antonio, TX',   0.7, 83, 55000,  'medium', true],
  ['Phoenix, AZ',       0.6, 59, 62000,  'low',    false],
  ['Las Vegas, NV',     0.5, 60, 61000,  'low',    false],
  ['Jacksonville, FL',  0.5, 47, 60000,  'low',    false],
  ['Fort Worth, TX',    0.3, 64, 62000,  'high',   true],
  ['Anaheim, CA',       0.3, 82, 71000,  'low',    true],
  ['Fremont, CA',       0.4, 74, 130000, 'low',    false],
  ['Madison, WI',       0.4, 27, 67000,  'high',   false],
  ['Seattle, WA',       0.6, 38, 105000, 'low',    false],
  ['Denver, CO',        1.3, 48, 72000,  'low',    false],
  ['San Diego, CA',     0.5, 58, 88000,  'low',    false],
];

// Scale bubble radius by income (sqrt for area perception)
function incomeToRadius(hhi) {
  return Math.sqrt(hhi / 1000) * 1.8;
}

function riskColor(risk, alpha) {
  if (risk === 'high')   return `rgba(193, 68, 14, ${alpha})`;
  if (risk === 'medium') return `rgba(233, 196, 106, ${alpha})`;
  return `rgba(0, 119, 182, ${alpha})`;
}

const bubbleCtx = document.getElementById('bubbleChart').getContext('2d');

// Custom plugin to draw city labels on labeled points
const labelPlugin = {
  id: 'bubbleLabels',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach(dataset => {
      dataset.data.forEach((point, i) => {
        if (!point.showLabel) return;
        const meta = chart.getDatasetMeta(chart.data.datasets.indexOf(dataset));
        if (!meta.data[i]) return;
        const { x, y } = meta.data[i].getCenterPoint();
        ctx.save();
        ctx.font = '500 11px DM Sans, sans-serif';
        ctx.fillStyle = '#1a1a2e';
        ctx.textAlign = 'center';
        ctx.fillText(point.city, x, y - point.r - 5);
        ctx.restore();
      });
    });
  }
};

new Chart(bubbleCtx, {
  type: 'bubble',
  plugins: [labelPlugin],
  data: {
    datasets: [
      {
        label: 'High contamination risk',
        data: cityData
          .filter(d => d[4] === 'high')
          .map(d => ({ x: d[2], y: d[1], r: incomeToRadius(d[3]), city: d[0], income: d[3], showLabel: d[5] })),
        backgroundColor: 'rgba(193, 68, 14, 0.55)',
        borderColor: 'rgba(193, 68, 14, 0.9)',
        borderWidth: 1.5,
      },
      {
        label: 'Medium contamination risk',
        data: cityData
          .filter(d => d[4] === 'medium')
          .map(d => ({ x: d[2], y: d[1], r: incomeToRadius(d[3]), city: d[0], income: d[3], showLabel: d[5] })),
        backgroundColor: 'rgba(233, 196, 106, 0.6)',
        borderColor: 'rgba(200, 160, 60, 0.9)',
        borderWidth: 1.5,
      },
      {
        label: 'Lower contamination risk',
        data: cityData
          .filter(d => d[4] === 'low')
          .map(d => ({ x: d[2], y: d[1], r: incomeToRadius(d[3]), city: d[0], income: d[3], showLabel: d[5] })),
        backgroundColor: 'rgba(0, 119, 182, 0.45)',
        borderColor: 'rgba(0, 119, 182, 0.85)',
        borderWidth: 1.5,
      },
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
            const p = ctx.raw;
            return [
              ` ${p.city}`,
              ` ${p.x}% residents of color`,
              ` ${p.y} public pools per 100k`,
              ` Median income: $${p.income.toLocaleString()}`,
            ];
          }
        }
      }
    },
    scales: {
      x: {
        min: 20,
        max: 90,
        title: {
          display: true,
          text: '% residents of color (Census ACS 2022)',
          font: { size: 12 }
        },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        min: 0,
        max: 12,
        title: {
          display: true,
          text: 'Public pools per 100,000 residents (TPL 2023)',
          font: { size: 12 }
        },
        grid: { color: 'rgba(0,0,0,0.05)' }
      }
    }
  }
});
