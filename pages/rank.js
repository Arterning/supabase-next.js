import { useSpring, animated } from '@react-spring/web'
import Image from "next/image";
import RankBarChart from "../components/RankBarChart";

export default function Rank() {
    const springs = useSpring({
        from: { y: 0 },
        to: { y: 30 },
    })

    const rightSprings = useSpring({
        from: { y: 200 },
        to: { y: 100 },
    })

    return (
        <>
            <animated.div
                style={{
                    borderRadius: 8,
                    ...springs,
                }}>
                <div className={"w-1/2 mx-auto"}>
                    <div className={"w-20 h-20"}>
                        <Image src="/chair.jpg" width={600} height={200} alt={"beauty"} className="rounded-2xl"/>
                    </div>
                    <RankBarChart/>
                </div>
            </animated.div>
s        </>
    );
}
