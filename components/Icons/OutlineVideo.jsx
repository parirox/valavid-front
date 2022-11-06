const OutlineVideo = ({ scale = 1, className = "text-white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.25 * scale}
      height={12.1 * scale}
      viewBox="0 0 18.25 12.1"
      className={className}
    >
      <g transform="translate(-0.75 -6.75)">
        <path
          fill="currentColor"
          d="M29.33,10.5,24,14.307l5.33,3.807Z"
          transform="translate(-11.078 -1.477)"
        />
        <path
          fill="currentColor"
          d="M3.023,7.5H11.4a1.523,1.523,0,0,1,1.523,1.523v7.615A1.523,1.523,0,0,1,11.4,18.161H3.023A1.523,1.523,0,0,1,1.5,16.638V9.023A1.523,1.523,0,0,1,3.023,7.5Z"
        />
      </g>
    </svg>
  );
};

export default OutlineVideo;
