const FillImage = ({
  scale = 1,
  className = "text-white",
  linearGradientColors = [],
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30 * scale}
      height={25.9 * scale}
      viewBox="0 0 30 25.9"
      className={className}
    >
      {linearGradientColors && (
        <defs>
          <linearGradient
            id="a"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            {linearGradientColors.map((v, i) => (
              <stop key={i} offset={i} stop-color={v} />
            ))}
          </linearGradient>
        </defs>
      )}
      <circle
        cx="3.625"
        cy="3.625"
        r="3.625"
        transform="translate(2.072)"
        fill={linearGradientColors.length ? "url(#a)" : "currentColor"}
      />
      <path
        d="M3,15.762a3,3,0,0,1-3-3V11.619H.018l0-.008L9.827,1.683a1.353,1.353,0,0,1,1.913,0l2.445,2.444a1.353,1.353,0,0,0,1.976-.067l3.146-3.6A1.353,1.353,0,0,1,21.283.4l8.76,11.215q0,.205-.008.4v.754a3,3,0,0,1-3,3Z"
        transform="translate(0 10.13)"
        fill={linearGradientColors.length ? "url(#a)" : "currentColor"}
      />
    </svg>
  );
};

export default FillImage;
