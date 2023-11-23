import { useState, useEffect } from 'react';

const TogetherPage = () => {
    const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const togetherDate = new Date(2023, 3, 23); // 2023年3月12日，月份是0-based，所以3代表4月
        const updateTogetherTime = () => {
            const now = new Date();
            const timeDifference = now - togetherDate;
            const totalSeconds = Math.floor(timeDifference / 1000);
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            setTimeTogether({ days, hours, minutes, seconds });
        };

        const timer = setInterval(updateTogetherTime, 1000);
        updateTogetherTime(); // 初始化时间

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={"bg-mountain h-full bg-no-repeat"}>
            <div className={"w-1/2 mx-auto py-60 px-20"}>
                <span className={"text-2xl p-2"}>我们在一起</span>
                <p className={"text-xl font-semibold text-amber-400/60"}>{`${timeTogether.days}天 ${timeTogether.hours}小时 ${timeTogether.minutes}分钟 ${timeTogether.seconds}秒`}啦!</p>
            </div>
        </div>
    );
};

export default TogetherPage;
