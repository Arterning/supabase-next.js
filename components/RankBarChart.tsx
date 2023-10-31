import React, {useEffect, useRef, useState} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {supabase} from "@/api";


const RankBarChart = (props: HighchartsReact.Props) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
    const [data, setData] = useState<any>([])

    useEffect(() => {
        async function fetchData2() {
            try {
                const res = await fetch('/api/rank/bar');
                return await res.json();
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        async function fetchData() {
            try {
                const resp = await supabase.from('ranks')
                    .select('*')

                const jsonData = resp.data;
                console.log(jsonData)

                // 用户ID到名称的映射
                var userMapping = {
                    "76d9290a-feba-4773-9c11-d43b9c180983": "小慧",
                    "f94079be-ed63-40b9-9095-c10689357919": "宁哥",
                    // 其他用户ID的映射
                };

                // 转换数据的数组
                var resultData = [];

                jsonData.forEach(function(item) {
                    var userId = item.user_id;
                    var name = userMapping[userId] || "未知用户";
                    var vv = item.vv;
                    resultData.push([name, vv]);
                });

                console.log(resultData)
                return resultData;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchData().then(res => {
            setData(res)
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
