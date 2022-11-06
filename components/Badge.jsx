const Badge = ({ className = "bg-primary rounded-xl", children }) => {
  return <span className={"p-3 text-center " + className}>{children}</span>;
};

export default Badge;
