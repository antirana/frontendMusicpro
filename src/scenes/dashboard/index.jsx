import React from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip
)

const Dashboard = () => {
  const data = {
    labels: ['Enero','Febrero','Marzo','Abril'],
    datasets: [{
      label: 'Cantidad de productos ',
      data: [400,230,780,640],
      backgroundColor: 'rgb(216, 17, 89)',
      borderColor: 'black',
      pointBorderColor: 'rgb(94, 8, 39)',
      fill: true,

      tension: 0.4
    }]
  }

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
         min: 0,
         max: 1000
      }
    }
  }
  
  return (
    <div className="App">
      <div style={
        {
          width: '600px',
          height:'300px',
          pading: '20px',
          margin: '0 auto'
        }

      }>
      <h1>Cantidad de instrumentos musicales vendidos a partir del mes</h1>
      <Line data={data} options={options} />

    </div>
    </div>
  );
} 

export default Dashboard;