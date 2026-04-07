'use client';
import { useEffect, useRef } from 'react';

export default function MoodChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let chart;
    async function loadChart() {
      const { Chart, registerables } = await import('chart.js');
      Chart.register(...registerables);

      const res = await fetch('/api/mood/data');
      const data = await res.json();
      if (!data.length) return;

      const moodColors = { great: '#10b981', good: '#3b82f6', okay: '#f59e0b', bad: '#f97316', terrible: '#ef4444' };

      chart = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: data.map(d => d.date),
          datasets: [{
            label: 'Mood Level', data: data.map(d => d.value),
            borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)',
            borderWidth: 3, fill: true, tension: 0.4,
            pointRadius: 6, pointBackgroundColor: data.map(d => moodColors[d.mood] || '#8b5cf6'),
            pointBorderColor: '#fff', pointBorderWidth: 2, pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true, plugins: { legend: { display: false },
            tooltip: { callbacks: { label: ctx => {
              const labels = { 5: 'Great', 4: 'Good', 3: 'Okay', 2: 'Bad', 1: 'Terrible' };
              return 'Feeling: ' + (labels[ctx.raw] || ctx.raw);
            }}}},
          scales: {
            y: { min: 0.5, max: 5.5, ticks: { stepSize: 1, callback: v => {
              const l = { 1: '😢 Terrible', 2: '😟 Bad', 3: '😐 Okay', 4: '🙂 Good', 5: '😊 Great' };
              return l[v] || '';
            }}, grid: { color: 'rgba(0,0,0,0.05)' }},
            x: { grid: { display: false } }
          }
        }
      });
    }
    loadChart();
    return () => { if (chart) chart.destroy(); };
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} aria-label="Mood history chart" role="img" />
    </div>
  );
}
