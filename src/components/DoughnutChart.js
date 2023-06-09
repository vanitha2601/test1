import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: 'x',
  elements: {
    Doughnut: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Dynamic Doughnut chart',
    },
  },
};

const DoughnutChart = () => {

  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      //const url ='https://dummy.restapiexample.com/api/v1/employees'
      const url = 'https://jsonplaceholder.typicode.com/users'
      //const url ='https://jsonplaceholder.typicode.com/comments'
      const labels = [];
      const dataSet1 = [];
      const dataSet2 = [];
      await fetch(url).then((data) => {
        console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        console.log("res", res)

        for (const val of res) {
          labels.push(val.username);
          dataSet1.push(val.id);
          dataSet2.push(val.name);
        }
        setData({
          id: 4,
          labels: labels,
          datasets: [
            {
              label: 'Dataset Id',
              data: dataSet1,
              backgroundColor: '#9BD0F5',
              // borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(25, 90, 13, 0.5)',
            },

            {
              label: 'Dataset PostId',
              data: dataSet2,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        })
      }).then((res) => {
        console.log("res", res)
      }).catch(e => {
        console.log("error", e)
      })
    }
    fetchData();
  },
    [])
  return (

    <div className="chart" >
      <div className="pieDoughnut">
        <Doughnut data={data} options={options} />
      </div>
    </div>


  )

}
export default DoughnutChart; 