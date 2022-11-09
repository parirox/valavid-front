const FillShoppingCart = ({ scale = 1, className = "text-white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18 * scale}
      height={18 * scale}
      viewBox="0 0 18 18"
      className={className}
    >
      <path
        fill="currentColor"
        d="M6.91,17.427a1.8,1.8,0,1,0,1.8,1.8A1.8,1.8,0,0,0,6.91,17.427ZM1.5,3V4.8H3.3l3.246,6.844L5.332,13.856a1.743,1.743,0,0,0-.225.866,1.809,1.809,0,0,0,1.8,1.8H17.73v-1.8H7.289a.223.223,0,0,1-.225-.225l.027-.108.812-1.47H14.62A1.8,1.8,0,0,0,16.2,11.99l3.228-5.852a.881.881,0,0,0,.108-.433.9.9,0,0,0-.9-.9H5.3L4.449,3ZM15.927,17.427a1.8,1.8,0,1,0,1.8,1.8A1.8,1.8,0,0,0,15.927,17.427Z"
        transform="translate(-1.5 -3)"
      />
    </svg>
  );
};

export default FillShoppingCart;
