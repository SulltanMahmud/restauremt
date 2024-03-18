import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import EmployeeList from '../components/EmployeeList.jsx'
import TableList from "../components/TableList.jsx";
import FoodList from "../components/FoodList.jsx";
import OrderList from "../components/OrderList.jsx";
import AllOrdersList from "../components/AllOrdersList.jsx";
import Login from "../pages/Login.jsx";
import ProtectedRoute from "../components/publicProtectedRoute/ProtectedRoute.jsx";
import ErrorePage from "../pages/ErrorePage.jsx";
import App from '../App.jsx'
import AlreadyLoggedInRoute from "../components/publicProtectedRoute/AlreadyLoggedInRoute.jsx";
import AddNewEmployee from "../components/AddNewEmployee.jsx";
import AddNewTable from "../components/AddNewTable.jsx";
import AddNewFood from "../components/AddNewFood.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><App /></ProtectedRoute>,
        loader: () => {
            return redirect("/admin")
        },
        errorElement: <ErrorePage />,

    },
    {
        path: "/login",
        element: <AlreadyLoggedInRoute><Login/></AlreadyLoggedInRoute>
    },
    {
        path: "/logout",
        loader: () => {
            return redirect("/login")
        },
    },
    {
        path: "/admin",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
            {
  
                index: true,
                element: <EmployeeList />,
 
            },
            {
                path: "add-employee",
                element: <AddNewEmployee />,
              
            },
            
            {
                path: "table-list",
                element: <TableList />,
             
                
            },
            {
                path: "add-table",
                element: <AddNewTable />,
                
              
            },
            {
                path: "food-list",
                element: <FoodList />,

            },
            {
                path: "add-food",
                element: <AddNewFood />,
                
              
            },
            {
                path: "order-list",
                element: <OrderList />,

            }
            ,
            {
                path: "all-orders-list",
                element: <AllOrdersList />,

            }

        ]

    },
])

export default routes;