import dynamic from 'next/dynamic'
import Weather from "../components/weather";




const WeatherPage = () => {
    return (
        <div className="w-full h-full bg-white-200">
            <Weather />
        </div>
    );
};

export default WeatherPage;
