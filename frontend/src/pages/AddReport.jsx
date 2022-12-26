import React, { useState } from 'react'
import Scafold from '../components/layouts/Scafold'
import { Stack } from '@mui/system';
import Select from 'react-select';
import { Axios } from '../app/axiosClient';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {
  Chart as ChartJS, CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
  LineElement,
);

ChartJS.defaults.font.size = 19;

const AddReport = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('product');
  const [cols, setCols] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedCol, setSelectedCol] = useState();
  const [selectYAxis, setSelectYAxis] = useState('id');
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const [bardata, setBardata] = useState({
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
  });

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  React.useEffect(() => {
    Axios.get('/list_tabs').then((response) => {
      const data = response.data.map((tabs) => {
        return { value: tabs.Tables_in_test, label: tabs.Tables_in_test, isFixed: true };
      });
      setTables(data);
    });
  }, [])

  React.useEffect(() => {
    Axios.post('/list_cols', { table: selectedTable }).then((response) => {
      const data = response.data.map((cols) => {
        return { value: cols, label: cols, isFixed: true };
      });
      console.log(data);
      setCols(data);
    });
  }, [selectedTable])


  const handleTableSelect = async (select) => {
    setSelectedTable(select.value);
  }

  const handleSelectedCols = async (cols) => {
    const temp = cols.map((x) => x.value);
    setSelectedCols(temp);
    setSelectedCol([...selectedCol]);
  }

  const handleSelectedCol = (col) => {
    setSelectedCol(col.value);
    setSelectedCols([...selectedCols, col.value]);
    setSelectYAxis(col.value);
  }

  function random_rgba() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  const transformData = (collection) => {
    const dataset = [];
    let _label2 = [];
    Object.keys(collection[0]).map((key) => {
      const _data = collection.map((obj) => {
        return obj[key];
      });
      dataset.push({ label: key, data: _data, backgroundColor: random_rgba() });
      if (key == selectYAxis) {
        _label2 = _data;
      }
    });
    return [dataset, _label2];
  }

  const handleGenerateReport = async () => {
    try {
      const response = await Axios.post('/generate_report', { table: selectedTable, cols: selectedCols });
      let [dataset, _label2] = transformData(response.data);
      console.log('final data', dataset);
      // const _labels = dataset.find((row, index) => {
      //   console.log('text', row.label, selectYAxis);
      //   if (row.label == selectYAxis) {
      //     return row.data;
      //   }
      // });
      console.log((_label2));
      const _barData = { labels: _label2, datasets: dataset };
      setBardata(_barData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleReset = () => {
    setSelectedCols([]);
    setSelectedCols({ label: '', value: '' });
  }

  return (
    <Scafold>
      <Stack direction={'column'} alignItems="center" sx={{ maxWidth: '100vw', minHeight: '40vh' }} >
        <Paper sx={{ width: '50vw', marginTop: 5, padding: 2 }} elevation={3}>
          <h3>منبع داده</h3>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={{ value: 'product', label: 'product' }}
            onChange={handleTableSelect}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={tables}
          />
          <h3>شاخص ها</h3>
          <Select
            className="basic-multi-select"
            isMulti
            classNamePrefix="select"
            onChange={handleSelectedCols}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={cols}
          />
          <h3>مبنا</h3>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={{ value: 'id', label: 'id' }}
            onChange={handleSelectedCol}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="color"
            options={cols}
          />
          <Button onClick={handleGenerateReport} variant="outlined" color="primary" disableElevation sx={{ marginTop: 5 }}>ایجاد گزارش</Button>
        </Paper>
        <Paper direction={'column'} alignItems="center" sx={{ maxWidth: '100vw', minHeight: '50vh', padding: 5, marginTop: 5 }}>
          <Typography sx={{ width: '100%', margin: 'auto' }} fontSize={24}>نمودار میله ای بر اساس {selectedCol}</Typography>
          <Bar data={bardata} />
          <Typography sx={{ width: '100%', margin: 'auto' }} fontSize={24}>نمودار خطی بر اساس {selectedCol}</Typography>
          <Line data={bardata} />
          <Typography sx={{ width: '100%', margin: 'auto' }} fontSize={24}>نمودار دونات بر اساس {selectedCol}</Typography>
          <Doughnut data={bardata} />
          <Typography sx={{ width: '100%', margin: 'auto' }} fontSize={24}>نمودار پای  بر اساس {selectedCol}</Typography>
          <Pie data={bardata} />
        </Paper>
      </Stack>
    </Scafold >
  )
}


export default AddReport