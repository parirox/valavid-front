const Chip = ({ icon, className, content }) => {
  return (
    <button className={"btn min-h-0 border-none rounded-full flex items-center gap-3 px-4 py-2 "+ className}>
      {icon}
      <span>{content}</span>
    </button>
  );
};

export default Chip;
