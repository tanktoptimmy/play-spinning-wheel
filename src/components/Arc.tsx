const polarToCartesian = (centerX: number, centerY: number, radius:number, angleInDegrees:number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};

const describeSlice = (x: number, y: number, radius: number, startAngle: number, endAngle: number):string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
        "M",
        0,
        0,
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ].join(" ");

    return d;
};

const path = (degrees = 90, radius = 10) =>
    `${describeSlice(0, 0, radius, 0, degrees)}Z`;

export const Arc: React.FC<Props> = ({ radius, degrees, x, y, rotate, colour, height="400px", width="400px", stroke="white", strokeWidth=5 }) => (
    <svg height={height} width={width}>
        <g
            transform={`translate(${x},${y}) rotate(${rotate})`}
            fill={colour}
        >
            <path d={path(degrees, radius)} opacity="1" stroke={stroke} strokeWidth={strokeWidth}/>
        </g>
    </svg>
);

type Props = {
  radius: number
  degrees: number
  x: number
  y: number
  rotate: number
  colour: string
  height?: string
  width?: string
  stroke?: string;
  strokeWidth?: number
}

export default Arc;
