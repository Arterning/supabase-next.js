import React, {useEffect, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const RankBarChart = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
    const [data, setData] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/rank/bar');
                return await res.json();
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchData().then(res => {
            setData(res.data)
        })

    }, [])

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            zooming: {
                type: 'xy'
            },
            backgroundColor: 'var(--chart-color)' // 设置图表的背景颜色
        },
        title: {
            text: '积分增长图'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45  // 设置轴标签旋转角度
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            },
            area: {
                fillOpacity: 0.5
            }
        },
        series: [
            {
                name: '积分',
                data,
            }
        ]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
            {...props}
        />
    )
}

export default RankBarChart
