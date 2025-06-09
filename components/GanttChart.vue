<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import { computed, watch, ref } from 'vue';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});

const today = new Date();

const chartData = computed(() => {
  // Сортируем мероприятия по дате
  const sortedEvents = [...props.events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return {
    labels: sortedEvents.map((e) => e.name),
    datasets: [
      {
        label: 'Дата мероприятия',
        data: sortedEvents.map((e) => {
          // Количество дней от сегодня до мероприятия
          const eventDate = new Date(e.date);
          const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
          return diff >= 0 ? diff : 0;
        }),
        backgroundColor: sortedEvents.map((e) => {
          const eventDate = new Date(e.date);
          return eventDate.toDateString() === today.toDateString()
            ? 'rgba(255, 99, 132, 0.7)' // Сегодня
            : 'rgba(54, 162, 235, 0.7)'; // Остальные
        }),
        borderRadius: 8,
        barPercentage: 0.7,
      },
    ],
  };
});

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          const days = context.raw;
          if (days === 0) return 'Сегодня';
          if (days === 1) return 'Завтра';
          return `${days} дней до мероприятия`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Дней до мероприятия',
      },
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
    y: {
      title: {
        display: true,
        text: 'Мероприятие',
      },
    },
  },
};
</script>
