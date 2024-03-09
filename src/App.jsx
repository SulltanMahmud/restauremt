import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    return <Dashboard />
  }
  return <Login />
}

