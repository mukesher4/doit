const TextOutline = ({
  width = 300,
  height = 400,
  borderRadius = 35,
  text = "DOIT::".repeat(125),
  fontSize = 14,
  animationDuration = "30s",
  fill = "white",
  padding = 20,
  offsetX = 0,
  offsetY = 0,
}) => {

  const pathData = `
    M ${borderRadius + padding},${padding}
    H ${width - borderRadius - padding}
    A ${borderRadius},${borderRadius} 0 0 1 ${width - padding},${borderRadius + padding}
    V ${height - borderRadius - padding}
    A ${borderRadius},${borderRadius} 0 0 1 ${width - borderRadius - padding},${height - padding}
    H ${borderRadius + padding}
    A ${borderRadius},${borderRadius} 0 0 1 ${padding},${height - borderRadius - padding}
    V ${borderRadius + padding}
    A ${borderRadius},${borderRadius} 0 0 1 ${borderRadius + padding},${padding}
    Z
  `;

  return (
    <svg
      className="absolute pointer-events-none z-30"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        top: `calc(50% - ${height / 2}px + ${offsetY}px)`,
        left: `calc(50% - ${width / 2}px + ${offsetX}px)`,
      }}
    >
      <defs>
        <path id="rectanglePath" d={pathData} />
      </defs>
      <g mask="url(#textMask)">
        <text 
            fill={fill} 
            stroke={fill}
            strokeWidth="0.5"
            fontSize={`${fontSize}px`} 
            fontFamily="monospace" 
            textAnchor="middle"
            dominantBaseline="middle"
        >
            <textPath 
            href="#rectanglePath" 
            startOffset="50"
            >
            {text}
            <animate
                attributeName="startOffset"
                values="0%;100%"
                dur={animationDuration}
                repeatCount="indefinite"
            />
            </textPath>
        </text>
      </g>
    </svg>
  );
};

export default TextOutline;