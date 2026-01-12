// Chart.js Defaults for Cyberpunk Look
Chart.defaults.color = '#8899aa';
Chart.defaults.font.family = "'Courier New', monospace";
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

// Data
const chartData = [
    {
        id: 1,
        name: "Aarav 'Glitch' Patel",
        handle: "@glitch_vibe",
        role: "Gamer / Streamer",
        relevanceScore: 98.4,
        sentimentScore: 8.2,
        trend: "up",
        reason: "Just beat the world record in 'Cyber Siege'",
        location: "Mumbai",
        avatar: "avatar_1.png",
        context: "Aarav has been streaming for 48 hours straight and just cracked the seemingly impossible level in Cyber Siege. Analysts predict a +15% sponsorship surge.",
        radarData: [90, 80, 20, 10, 100], // Based, Wholesome, Toxic, Cringe, Chaotic
        sparkline: [40, 45, 60, 55, 80, 92, 98]
    },
    {
        id: 2,
        name: "Priya Sharma",
        handle: "@priya_tech",
        role: "Tech Influencer",
        relevanceScore: 92.1,
        sentimentScore: -2.5,
        trend: "down",
        reason: "Controversial take on AI regulation",
        location: "Bangalore",
        avatar: "avatar_2.png",
        context: "Priya's regulatory stance triggered a dev community backlash. Sentiment volatility is high (VIX: 78.4). Negative momentum is accelerating.",
        radarData: [50, 40, 60, 30, 70],
        sparkline: [80, 85, 90, 92, 60, 40, 35]
    },
    {
        id: 3,
        name: "Rohan 'Drip' Verma",
        handle: "@rohan_drip",
        role: "Fashion Vlogger",
        relevanceScore: 88.7,
        sentimentScore: 5.5,
        trend: "stable",
        reason: "Launched 'Neon Heritage' clothing line",
        location: "Delhi",
        avatar: "avatar_3.png",
        context: "Market reaction to 'Neon Heritage' is cautiously optimistic. Strong 'Based' signals from core fans, but mainstream adoption shows resistance.",
        radarData: [70, 60, 10, 40, 50],
        sparkline: [50, 50, 52, 55, 60, 85, 88]
    },
    {
        id: 4,
        name: "Vikram Das",
        handle: "@vikram_talks",
        role: "Political Commentator",
        relevanceScore: 85.3,
        sentimentScore: 1.2,
        trend: "up",
        reason: "Viral debate clip on student rights",
        location: "Kolkata",
        avatar: "avatar_4.png",
        context: "Vikram's verbal combat stats are peaking. 'Chaotic' and 'Toxic' indices are elevated, driving engagement despite polarized sentiment.",
        radarData: [60, 20, 70, 10, 90],
        sparkline: [30, 35, 32, 40, 45, 80, 85]
    },
    {
        id: 5,
        name: "Sneha Reddy",
        handle: "@sneha_eats",
        role: "Food Blogger",
        relevanceScore: 78.9,
        sentimentScore: 9.1,
        trend: "up",
        reason: "Discovered hidden gem in Hyderabad",
        location: "Hyderabad",
        avatar: "avatar_1.png", // reusing for demo
        context: "Pure 'Wholesome' rally. No toxicity detected. The 'Sneha Effect' is driving real-world economic indicators for local vendors.",
        radarData: [80, 100, 0, 0, 10],
        sparkline: [40, 42, 45, 50, 60, 75, 78]
    }
];

// State
let state = {
    view: 'relevance',
    filter: 'national',
    data: [...chartData]
};

// Global Charts Instances
let marketChart = null;
let radarChart = null;

// DOM Elements
const container = document.getElementById('chart-container');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('profile-modal');
const closeModal = document.getElementById('close-modal');

// Init
function init() {
    initMarketChart();
    render();
    setupEventListeners();
}

// Global Market Chart
function initMarketChart() {
    const ctx = document.getElementById('marketChart').getContext('2d');

    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(204, 255, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Volatility',
                data: [45, 52, 38, 75, 94, 82, 88],
                borderColor: '#ccff00',
                backgroundColor: gradient,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: { display: false } // clean look
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Rendering List
function render() {
    container.innerHTML = '';

    let sortedData = [...state.data];
    if (state.view === 'relevance') {
        sortedData.sort((a, b) => b.relevanceScore - a.relevanceScore);
    } else {
        sortedData.sort((a, b) => b.sentimentScore - a.sentimentScore);
    }

    if (state.filter === 'state') {
        sortedData = sortedData.filter(item => Math.random() > 0.3);
    }

    sortedData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'chart-item';
        card.style.animationDelay = `${index * 0.1}s`;

        const score = state.view === 'relevance' ? item.relevanceScore : item.sentimentScore;
        const scoreClass = state.view === 'relevance' ? 'neutral' : (score >= 0 ? 'positive' : 'negative');
        const scorePrefix = state.view === 'sentiment' && score > 0 ? '+' : '';

        // Generate Sparkline Canvas ID
        const sparkId = `spark_${item.id}`;

        card.innerHTML = `
            <div class="rank ${index < 3 ? 'top-3' : ''}">#${index + 1}</div>
            <div class="profile-col">
                <div class="avatar-wrapper">
                    <img src="assets/${item.avatar}" alt="${item.name}" class="avatar" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}'">
                </div>
                <div class="info">
                    <div class="name">${item.name}</div>
                    <div class="role">${item.role}</div>
                </div>
            </div>
            
            <div class="sparkline-col">
                <canvas id="${sparkId}" height="40"></canvas>
            </div>
            
            <div class="score-badge ${scoreClass}">
                ${scorePrefix}${score}
            </div>
        `;

        card.addEventListener('click', () => openModal(item, index + 1));
        container.appendChild(card);

        // Render Sparkline immediate after append
        renderSparkline(sparkId, item.sparkline);
    });
}

function renderSparkline(canvasId, dataPoints) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [{
                data: dataPoints,
                borderColor: params => params.chart.data.datasets[0].data[6] > params.chart.data.datasets[0].data[0] ? '#ccff00' : '#ff3333',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } },
            animation: false
        }
    });
}

// Interaction
function setupEventListeners() {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.view = btn.dataset.view;
            render();
        });
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filter = btn.dataset.filter;
            render();
        });
    });

    closeModal.addEventListener('click', () => {
        modal.close();
        modal.style.opacity = '0';
    });

    const slider = document.getElementById('sentiment-slider');
    const valDisplay = document.getElementById('current-sentiment-val');
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        valDisplay.innerText = val > 0 ? `+${val}` : val;
    });
}

function openModal(item, rank) {
    document.getElementById('modal-name').innerText = item.name;
    document.getElementById('modal-rank').innerText = `#${rank}`;
    document.getElementById('modal-avatar').src = `assets/${item.avatar}`;
    document.getElementById('modal-avatar').onerror = function () {
        this.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`;
    };
    document.getElementById('modal-relevance-score').innerText = item.relevanceScore;
    document.getElementById('modal-reason').innerText = item.context;

    // Reset Slider
    const slider = document.getElementById('sentiment-slider');
    slider.value = 0;
    document.getElementById('current-sentiment-val').innerText = '0';

    modal.showModal();
    setTimeout(() => modal.style.opacity = '1', 10);

    // Render Radar Chart
    renderRadarChart(item);
}

function renderRadarChart(item) {
    const ctx = document.getElementById('radarChart').getContext('2d');

    // Destroy previous instance
    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Based', 'Wholesome', 'Toxic', 'Cringe', 'Chaotic'],
            datasets: [{
                label: item.name,
                data: item.radarData,
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderColor: '#00ffff',
                pointBackgroundColor: '#00ffff',
                pointBorderColor: '#fff',
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#8899aa', font: { size: 10 } },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

init();
