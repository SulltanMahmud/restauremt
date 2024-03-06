
import useCart from "../hooks/useCart";
import { Button, Drawer, Typography } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const CartComponent = () => {
  const modalContent = (
    <div>
      <h2>This is the Right Modal</h2>
      <p>Content goes here...</p>
    </div>
  );

  const { open, cartLength, handleToggle, updateCartLengthManually, classes } =
    useCart({ modalContent });
    

  return (
    <div>
      <div className="relative">
        <Button onClick={handleToggle}>
          <ShoppingBasketIcon className="text-white" />
        </Button>
        <Typography className="text-white absolute -top-2 right-0 rounded-full p-1 text-xs">
          {cartLength}
        </Typography>
      </div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleToggle}
        classes={{ paper: classes.drawerPaper }}
      >
        {modalContent}
      </Drawer>
    </div>
  );
};

export default CartComponent;
