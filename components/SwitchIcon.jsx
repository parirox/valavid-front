const SwitchIcon = ({
  firstIcon ,
  secondIcon = false,
  changeMode = false,
}) => {
  if (!!changeMode)
    return (
      firstIcon
    );
  return secondIcon;
};

export default SwitchIcon;
