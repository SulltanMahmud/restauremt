import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  drawerPaper: {
    width: 500,
    marginTop: 70,
  },
});

const useCart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const handleToggle = () => {
    setOpen(!open);
  };

  return {
    open,
    handleToggle,
    classes,
  };
};

export default useCart;
