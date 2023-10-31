import {NextResponse} from "next/server";


export async function GET(req) {
    const weatherData = {
        weather: [
            {
                description: 'Beauty Partly cloudy',
                icon: '02d',
            },
        ],
        main: {
            temp: Math.floor(Math.random() * 30) - 10, // 随机温度在 -10°C 到 20°C 之间
            humidity: Math.floor(Math.random() * 100), // 随机湿度
            difssi: null
        },
    };
    const res = await fetch('http://data-api.91weather.com/zoomlion2022/realtime?lat=28.2278&lon=112.9389');
    const body = await res.json();


    //copy data
    console.log(body)
    weatherData.weather[0].description = body.data.wp;
    weatherData.main.temp = body.data.tmp;
    weatherData.main.difssi = body.data.difssi;
    console.log(weatherData)
    return NextResponse.json(weatherData)
}
