import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import DoughnutChart from './components/DoughnutChart';
import './App.css';
import 'chart.js/auto';



function App() {

  return (
    <div className="App">

      <div id="div1">

        <BarChart />

      </div>

      <div id="div2" >
        <LineChart />
      </div>


      <div id="div3" >

        <PieChart />

      </div>


      <div id="div4" >

        <DoughnutChart />

      </div>

    </div>
  );
}

export default App;
