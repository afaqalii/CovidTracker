import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
// import { Line } from 'react-chartjs-2'

const LineGraph = () => {
  
    const [Data, setData] = useState({})


    const buildChartData = (data, casesType='cases') => {
        const charData = [];
        let lastDataPoint;
        data.casesType.forEach(data => {
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                charData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date];
        })
        return charData
    }


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response => response.json())
        .then(data => {
            const chartData = buildChartData(data, casesType)
            setData(chartData)
        } )
    },[])

    return (
    <div>
        <h1>line Graph</h1>
        {/* <Line data={{
            datasets: [{
                Data
            }]
        }}/> */}
    </div>
  )
}

export default LineGraph