import {NextResponse} from "next/server";


export async function GET(req) {
    const randomWeatherData = {
        weather: [
            {
                description: 'Beauty Partly cloudy',
                icon: '02d',
            },
        ],
        main: {
            temp: Math.floor(Math.random() * 30) - 10, // 随机温度在 -10°C 到 20°C 之间
            humidity: Math.floor(Math.random() * 100), // 随机湿度
        },
    };
    return NextResponse.json(randomWeatherData)
}
