const FillCaretDown = ({ scale = 1, className = "text-white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={8 * scale}
      height={6 * scale}
      viewBox="0 0 8 6"
      className={className}
    >
      <path
        d="M3.168,1.248a1,1,0,0,1,1.664,0l2.131,3.2A1,1,0,0,1,6.131,6H1.869a1,1,0,0,1-.832-1.555Z"
        transform="translate(8 6) rotate(180)"
        fill="currentColor"
      />
    </svg>
  );
};

export default FillCaretDown;
