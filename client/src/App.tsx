import { useEffect, useState, useRef, Fragment } from 'react';
import './App.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

type Data = {
  month: string;
  year: string;
  day: string;
  cpu_hours: string;
};

export function App() {
  const [data, setData] = useState<Data[]>([]);
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [isLineChart, setIsLineChart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    call();
  }, []);

  const call = async (year = '2017') => {
    try {
      const res = await fetch(`http://localhost:8000/data?year=${year}`);
      const data = await res.json();
      setData(data.data);
      handleMonthChange(null, data.data);
      selectRef.current!.value = '1';
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleMonthChange = (e?: any, incomingData: Data[] = data) => {
    setDisplayedData([]);
    const value = e?.target.value || '1';
    const currentMonthData = incomingData.filter(
      (individualData) => individualData.month === value,
    );

    currentMonthData.forEach((data, i) => {
      setDisplayedData((prevData) => [
        ...prevData,
        { name: `Day ${i + 1}`, cpuHours: data.cpu_hours },
      ]);
    });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className='loading'>
          <h1 className='welcome-text'>Welcome!</h1>
        </div>
      ) : (
        <div className='main'>
          <h2>Welcome to the CPU Usage Charts</h2>
          <p>It simple to use. Just select the year, and the month, and we show you the data</p>
          <div className='flex'>
            <select onChange={(e) => call(e.target.value)}>
              <option value='2017'>2017</option>
              <option value='2018'>2018</option>
              <option value='2019'>2019</option>
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
            </select>
            <div className='check'>
              <input
                type='checkbox'
                checked={isLineChart}
                onChange={() => setIsLineChart(!isLineChart)}
              />
              <span className='label'>{isLineChart ? 'Bar Chart' : 'Line Chart'}</span>
            </div>
            <select ref={selectRef} onChange={handleMonthChange}>
              <option value='1'>January</option>
              <option value='2'>February</option>
              <option value='3'>March</option>
              <option value='4'>April</option>
              <option value='5'>May</option>
              <option value='6'>June</option>
              <option value='7'>July</option>
              <option value='8'>August</option>
              <option value='9'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
          </div>
          <div className='chart'>
            {!isLineChart ? (
              <LineChart width={1200} height={500} data={displayedData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis tickCount={10} minTickGap={3} />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='cpuHours' activeDot={{ r: 8 }} stroke='#8884d8' />
              </LineChart>
            ) : (
              <BarChart width={1200} height={500} data={displayedData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis tickCount={10} minTickGap={3} />
                <Tooltip />
                <Legend />
                <Bar dataKey='cpuHours' fill='#8884d8' />
              </BarChart>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
