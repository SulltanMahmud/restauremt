/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ApiCall from "./apiCollection/ApiCall";
import Paper from "@mui/material/Paper";
import "../styles/CommonStyle.css";
import "../styles/OrderListStyle.css";
import useTable from "../hooks/useTable.jsx";
import CheckCard from "./Card.jsx";
import Button from "@mui/material/Button";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import {  addItem, clearCart, selectCart,setTableId } from "../hooks/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const OrderList = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(null);
  const loader = useRef(null);
  const { data: table } = useTable(0, 10);
  const [checkedCard, setCheckedCard] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);



  const handleCheckChange = (id) => {
    setCheckedCard(id === checkedCard ? null : id);
    dispatch(clearCart());
  };
  useEffect(() => {
    if (checkedCard) {
      dispatch(clearCart());
    }
  }, [checkedCard]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ApiCall.baseUrl}food/datatable?page=1&per_page=10`
        );
        setMenuData(response.data.data);
        setLastPage(response.data.next_page_url);
      } catch (error) {
        console.error("Error fetching initial menu data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(menuData);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    function handleObserver(entities) {
      const target = entities[0];
      if (target.isIntersecting && checkedCard) {
        if (lastPage && !loading) {
          fetchMenuData();
        }
      }
    }

    return () => observer.disconnect();
  }, [lastPage, loading, checkedCard]);

  const fetchMenuData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(lastPage);
      setMenuData((prevData) => [...prevData, ...response.data.data]);
      setLastPage(response.data.next_page_url);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCard = (newData) => {
    if (cartItems) {
      const isItemAlreadyInCart = cartItems.items.some(
        (item) => item.id === newData.id
      );
      if (isItemAlreadyInCart) {
        console.log("Item with id " + newData.id + " is already in the cart.");
        return;
      }
    } else {
      console.log("Cart is empty");
    }
    const data ={
      id: newData.id,
      name: newData.name,
      price: newData.price,
      discountPrice: newData.discountPrice,
      image: newData.image,
      description: newData.description,
      quantity: 1,
    }
    console.log(data)
    dispatch(addItem(data));
  };
  dispatch(setTableId(checkedCard));


  console.log(cartItems)

  return (
    <>
      <Paper className="mainOrderPaperStyle">
        <div className="page-top">
          <div>
            <span className="under-line page-title">Order Food</span>
          </div>
          {/* <div>Search container here</div> */}
        </div>
        <div className="mainOrderTableContainer">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} className="relative">
              <div className="sectionTableHeader">
                SELECT A TABLE ({table.length})
              </div>
              <div className="tableCardContainer">
                <Card className="tableCardStyle">
                  {table.map(
                    (
                      menuItem,
                      index // Render only visible cards
                    ) => (
                      <CheckCard
                        key={index}
                        menuItem={menuItem}
                        menuImage={menuItem.image}
                        checked={menuItem.id === checkedCard}
                        onChange={handleCheckChange}
                      />
                    )
                  )}
                </Card>
              </div>
            </Grid>
            {checkedCard ? (
              <Grid item xs={12} sm={9}>
                
                <Container className="relative">
                  <Card className="foodMainCardStyle">
                    <div className="sectionFoodHeader">
                      SELECT FOODS ({menuData.length})
                    </div>
                    <div className="mt-12 ">
                      {menuData.map((menuItem) => (
                        <Card
                        
                          key={menuItem.id}
                          className="foodCardStyle"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#CC080B";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "transparent";
                          }}
                        >
                          <CardContent >
                            <Grid  container spacing={2}>
                              <Grid item xs={12} sm={3}>
                                <img
                                  src={`https://restaurantapi.bssoln.com/images/food/${menuItem?.image}`}
                                  alt="Image"
                                  className="foodImage"
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12} sm={9}
                                className="foodDetailsGrid"
                              >
                                <Typography
                                  variant="h6"
                                  component="h2"
                                  className="foodNameTypography"
                                >
                                  {menuItem.name}
                                </Typography>
                                <Typography className="foodDetailsTypography">
                                  {menuItem.description}
                                </Typography>
                                {menuItem.discountPrice ? (
                                  <div>
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      className="foodPriceTypography"
                                    >
                                      Price: {menuItem.price}
                                    </Typography>
                                    <div className="flex justify-between">
                                      <Typography
                                        className="foodDiscountPriceTypography"
                                      >
                                        Discounted Price:{" "}
                                        <span style={{ fontWeight: "800" }}>
                                          {menuItem.discountPrice}৳
                                        </span>
                                      </Typography>
                                      
                                      <Button
                                        variant="contained"
                                        style={{
                                          backgroundColor: cartItems?.items.some(
                                            (item) => item.id === menuItem.id
                                          )
                                            ? "#080000"
                                            : "#CC080B",
                                          color: "white",
                                          fontWeight: "bold",
                                        }}
                                        onClick={() => {
                                          handleAddToCard(menuItem);
                                        }}
                                      >
                                        Add To Cart
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      style={{
                                        color: "black",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      Price: {menuItem.price}৳
                                    </Typography>
                                    <Button
                                      variant="contained"
                                      style={{
                                        backgroundColor: cartItems?.items.some(
                                          (item) => item.id === menuItem.id
                                        )
                                          ? "#080000"
                                          : "#CC080B",
                                        color: "white",
                                        fontWeight: "bold",
                                      }}
                                      onClick={() => {
                                        handleAddToCard(menuItem);
                                      }}
                                    >
                                      Add To Cart
                                    </Button>
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {loading && <Typography>Loading...</Typography>}
                    <div ref={loader} />
                  </Card>
                </Container>
              </Grid>
            ) : (
              <Grid item xs={12} sm={9}>
                <div className="relative h">
                  <Container
                   className="notificationStyle"
                  >
                    <NewReleasesIcon sx={{ fontSize: 70, color: "#b71c1c" }} />
                    <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                      At First Select A Table!
                    </Typography>
                  </Container>
                  <Container sx={{ opacity: "0.5" }}>
                    <Card
                      style={{
                        height: "70vh",
                        width: "auto",
                        padding: "10px",
                        opacity: 0.5,
                        pointerEvents: "none",
                      }}
                    >
                      <div className=" mt-12 ">
                        {menuData.map((menuItem) => (
                          <Card
                            key={menuItem.id}
                            style={{
                              marginBottom: "10px",
                              cursor: "pointer",
                              transition: "border-color 0.3s ease",
                              border: "1px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "red";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "transparent";
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2}>
                                <Grid item xs={3}>
                                  <img
                                    src={`https://restaurantapi.bssoln.com/images/food/${menuItem?.image}`}
                                    alt="Image"
                                    className="rounded-full hover:animate-spin-slow w-[190px] h-[190px]"
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={9}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    margin: "auto 0px",
                                    gap: "10px",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                      color: "black",
                                      fontWeight: "bolder",
                                    }}
                                  >
                                    {menuItem.name}
                                  </Typography>
                                  <Typography color="text.primary">
                                    {menuItem.description}
                                  </Typography>
                                  <div>
                                    <Typography
                                      variant="h6"
                                      component="h2"
                                      style={{
                                        textDecoration: "2px line-through",
                                        color: "red",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      Price: {menuItem.price}
                                    </Typography>
                                    <div className="flex justify-between">
                                      <Typography
                                        style={{
                                          color: "green",
                                        }}
                                      >
                                        Discounted Price:{" "}
                                        <span className="font-extrabold">
                                          {menuItem.discountPrice}৳
                                        </span>
                                      </Typography>
                                      <Button
                                        variant="contained"
                                        style={{
                                          backgroundColor: "red",
                                          color: "white",
                                          fontWeight: "bold",
                                          disabled: true,
                                        }}
                                      >
                                        Add To Cart
                                      </Button>
                                    </div>
                                  </div>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      {loading && <Typography>Loading...</Typography>}
                      <div ref={loader} />
                    </Card>
                  </Container>
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </Paper>
    </>
  );
};

export default OrderList;