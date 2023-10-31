import RankChart from "../components/RankChart";
import { useSpring, animated } from '@react-spring/web'
import Image from "next/image";

export default function Rank() {
    const springs = useSpring({
        from: { y: 0 },
        to: { y: 100 },
    })

    const rightSprings = useSpring({
        from: { y: 200 },
        to: { y: 100 },
    })

    return (
        <>
            <animated.div
                style={{
                    width: '60%',
                    float: 'left',
                    borderRadius: 8,
                    ...springs,
                }}>
                <RankChart/>
            </animated.div>

            <animated.div style={{
                width: '25%',
                background: 'rgba(36,180,126,0.41)',
                borderRadius: 8,
                float: 'right',
                ...rightSprings
            }}>
                <Image src="/chair.jpg" width={600} height={200} alt={"beauty"}/>
            </animated.div>

        </>
    );
}
