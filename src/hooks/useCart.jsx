import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
// import { Typography } from "@mui/material";

const useStyles = makeStyles({
  drawerPaper: {
    width: 250,
    marginTop: 70,
  },
});

const useCart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const updateCartLength = () => {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      setCartLength(cartData ? cartData.length : 0);
    };

    updateCartLength();

    window.addEventListener("storage", updateCartLength);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("storage", updateCartLength);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handleToggle = () => {
    setOpen(!open);
  };

  // Function to manually update cart length
  // const updateCartLengthManually = (length) => {
  //   setCartLength(length);
  //   console.log(length)
  // }

  return {
    open,
    cartLength,
    handleToggle,
    classes
  };
};

export default useCart;
