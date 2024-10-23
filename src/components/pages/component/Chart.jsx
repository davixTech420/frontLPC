import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Carousel from 'react-material-ui-carousel';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Simulated data for theaters and their shows
const theaterData = [
  {
    name: "Teatro A",
    shows: [
      { date: "23 Nov", count: 5 },
      { date: "24 Nov", count: 7 },
      { date: "25 Nov", count: 10 },
      { date: "26 Nov", count: 8 },
      { date: "27 Nov", count: 12 },
      { date: "28 Nov", count: 15 },
      { date: "29 Nov", count: 18 },
      { date: "30 Nov", count: 20 },
    ]
  },
  {
    name: "Teatro B",
    shows: [
      { date: "23 Nov", count: 3 },
      { date: "24 Nov", count: 5 },
      { date: "25 Nov", count: 8 },
      { date: "26 Nov", count: 7 },
      { date: "27 Nov", count: 10 },
      { date: "28 Nov", count: 12 },
      { date: "29 Nov", count: 14 },
      { date: "30 Nov", count: 16 },
    ]
  },
  // Add more theaters as needed
];

export function GraficaLine() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const currentTheater = theaterData[0];
    const newChartData = {
      labels: currentTheater.shows.map(show => show.date),
      datasets: [
        {
          label: `Cantidad de Shows - ${currentTheater.name}`,
          data: currentTheater.shows.map(show => show.count),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
    setChartData(newChartData);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Cantidad de Shows por Teatro'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Shows'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      }
    }
  };

  return (
    <Carousel
      animation="slide"
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      interval={4000}
      duration={500}
    >
      {theaterData.map((theater, index) => (
       <center> <div key={index} style={{ minWidth: '100%', height: '200px'  }}>
          <Line data={{
            labels: theater.shows.map(show => show.date),
            datasets: [
              {
                label: `Cantidad de Shows - ${theater.name}`,
                data: theater.shows.map(show => show.count),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          }} options={options} />
        </div></center>
      ))}
    </Carousel>
  );
}