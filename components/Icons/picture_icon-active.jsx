import svgStyles from "@/styles/Svg.module.css";
const PictureIconActive = ({
  scale = 1,
  color = "#fff",
  linearGradientColors = [],
  changeMode = false,
}) => {
  if (!!changeMode)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={66 * scale}
        height={65 * scale}
        viewBox="0 0 66 65"
        color={color}
        className={svgStyles.svg}
      >
        {linearGradientColors && (
          <defs>
            <linearGradient
              id="a"
              x1="0.5"
              y1="0.06"
              x2="0.5"
              y2="0.968"
              gradientUnits="objectBoundingBox"
            >
              {linearGradientColors.map((v, i) => (
                <stop key={i} offset={i} stop-color={v} />
              ))}
            </linearGradient>
          </defs>
        )}
        <g transform="translate(0.468 -0.338)">
          <g transform="translate(18.062 16.061)">
            <circle
              cx="3.625"
              cy="3.625"
              r="3.625"
              transform="translate(2.072)"
              fill={color}
            />
            <path
              d="M3,15.762a3,3,0,0,1-3-3V11.619H.018l0-.008L9.827,1.683a1.353,1.353,0,0,1,1.913,0l2.445,2.444a1.353,1.353,0,0,0,1.976-.067l3.146-3.6A1.353,1.353,0,0,1,21.283.4l8.76,11.215q0,.205-.008.4v.754a3,3,0,0,1-3,3Z"
              transform="translate(0 10.13)"
              fill={linearGradientColors ? "url(#a)" : color}
            />
          </g>
        </g>
      </svg>
    );
  return <div>other side</div>;
};

export default PictureIconActive;
