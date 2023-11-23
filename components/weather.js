import {useEffect, useState} from 'react';
import {WiCloud, WiDaySunny, WiFog, WiRain, WiSnow, WiThunderstorm} from 'react-icons/wi';

const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const res = await fetch('/api/weather');
                return await res.json();
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchMockData = async() => {
            const mockData = {
                weather: [
                    {
                        description: 'Good Partly cloudy',
                        icon: '10d',
                    },
                ],
                main: {
                    temp: Math.floor(Math.random() * 30) - 10, // 随机温度在 -10°C 到 20°C 之间
                    humidity: Math.floor(Math.random() * 100), // 随机湿度
                },
            }
            return mockData;
        }

        fetchWeatherData().then(res => {
            setWeatherData(res)
        });

    }, []);

    const renderWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case '01d':
                return <WiDaySunny />;
            case '02d':
                return <WiCloud />;
            case '03d':
            case '04d':
                return <WiCloud />;
            case '09d':
                return <WiRain />;
            case '10d':
                return <WiRain />;
            case '11d':
                return <WiThunderstorm />;
            case '13d':
                return <WiSnow />;
            case '50d':
                return <WiFog />;
            default:
                return <WiDaySunny />;
        }
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"mx-auto w-1/2 py-20"}>
            <h1 className={"text-3xl"}>今天的天气</h1>
            <div>
                <div>
                    <div>{renderWeatherIcon(weatherData.weather[0].icon)}</div>
                    <p className={"text-zinc-700"}>地区：长沙 </p>
                    <p className={"text-zinc-700"}>天气：{weatherData.weather[0].description}</p>
                    <p className={"text-zinc-700"}>温度：{weatherData.main.temp}°C</p>
                    <p className={"text-zinc-700"}>空气质量：{weatherData.main.humidity}%</p>
                    <p className={"text-zinc-700"}>太阳辐射： {weatherData.main.difssi} </p>
                </div>
            </div>
        </div>
    );
};

export default Weather;
