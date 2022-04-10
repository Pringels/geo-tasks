import React from "react"
import Svg, { Ellipse, Path, Circle } from "react-native-svg"

type MarkerProps = {
    viewBox?: string
}

export const Marker = ({ viewBox = "0 0 42 64" }: MarkerProps) => (
    <Svg height={64} width={42} viewBox={viewBox}>
        <Ellipse cx={13.5} cy={34.8} rx={10.5} ry={5.25} />
        <Path
            fill="#222"
            d="M27 13.5c0 5.57-6.75 13.5-12.25 21-.73 1-1.77 1-2.5 0C6.75 27 0 19.22 0 13.5 0 6.04 6.04 0 13.5 0S27 6.04 27 13.5Z"
        />
        <Path
            opacity={0.25}
            d="M13.5 0C6.04 0 0 6.04 0 13.5c0 5.72 6.75 13.5 12.25 21 .75 1.02 1.77 1 2.5 0C20.25 27 27 19.07 27 13.5 27 6.04 20.96 0 13.5 0Zm0 1C20.42 1 26 6.58 26 13.5c0 2.4-1.5 5.68-3.78 9.24-2.27 3.56-5.51 7.4-8.28 11.17-.2.27-.33.41-.44.53-.11-.12-.24-.26-.44-.53-2.78-3.78-5.65-7.6-8.04-11.14C2.62 19.23 1 15.95 1 13.5 1 6.58 6.58 1 13.5 1Z"
        />
        <Circle fill="#fff" cx={13.5} cy={13.5} r={5.5} />
    </Svg>
)
