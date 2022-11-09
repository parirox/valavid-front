const FillUser = ({ scale = 1, className = "text-white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17 * scale}
      height={17 * scale}
      viewBox="0 0 17 17"
      className={className}
    >
      <path
        fill="currentColor"
        d="M8.467,9.526A4.763,4.763,0,1,0,3.7,4.763,4.764,4.764,0,0,0,8.467,9.526ZM12.7,10.584H10.878a5.758,5.758,0,0,1-4.822,0H4.234A4.233,4.233,0,0,0,0,14.818v.529a1.588,1.588,0,0,0,1.588,1.588H15.347a1.588,1.588,0,0,0,1.588-1.588v-.529A4.233,4.233,0,0,0,12.7,10.584Z"
      />
    </svg>
  );
};

export default FillUser;
