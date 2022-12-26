import React from 'react'
import Scafold from '../components/layouts/Scafold'
import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';
import {
  Chart as ChartJS, CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Paper } from '@mui/material';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.size = 24;

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  label: {
    size: 40,
  },
  scales: {
    xAxes: [{
      ticks: {
        fontColor: "white",
      }
    }],
  },
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
      font: {
        size: 40
      }
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const bardata = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 5, 8],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 4, 5],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const AddReport = () => (
  <Scafold>
    <Stack direction={'column'} sx={{ maxWidth: '30vw', minHeight: '30vh' }} >
      <Bar options={options} data={bardata} />
      <Pie options={options} data={data} />
    </Stack>
  </Scafold >
)

export default AddReport