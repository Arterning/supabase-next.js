import React, {useEffect, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

const mock_xiaohui = [[1689177600000, 50.52], [1690128000000, 147.36], [1690878539465, 146.95]]
const mock_ning = [[1689177600000, 20.52], [1690128000000, 55.36], [1690878539465, 65.95]]



// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).

const RankChart = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
    const [xiaohui, setXiaohui] = useState<any>([])
    const [ning, setNing] = useState<any>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/rank');
                return await res.json();
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchData().then(res => {
            setXiaohui(res.xiaohui)
            setNing(res.ning)
        })

    }, [])

    const options: Highcharts.Options = {
        chart: {
            type: 'area',
            zooming: {
                type: 'xy'
            },
            backgroundColor: 'var(--chart-color)' // 设置图表的背景颜色
        },
        title: {
            text: '积分增长图'
        },
        xAxis: {
            //表示为时间，注意大小写
            type: 'datetime',
            //间距，时间戳，以下表示间距为1天，如果想表示间距为1周，就这么写 7*24*3600*1000
            tickInterval:  24 * 3600 * 1000,
            //格式化时间，day,week....
            dateTimeLabelFormats: {
                day: '%Y-%m-%d'
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
        series: [{
            name: '宁哥',
            color: 'rgba(1,251,222,0.39)',
            data: xiaohui,
            type:'area'
        }, {
            name: '小慧',
            color: 'rgb(255,192,203)',
            data: ning,
            type:'area'
        }]
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

export default RankChart
