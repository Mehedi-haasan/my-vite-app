import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Container from "./Components/Container/Container";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Auth/Login";
import Registration from "./Components/Auth/Registration";
import ProductCreate from "./Components/ProductCreate/ProductCreate";
import Product from "./Components/Product/Product";
import ProductCategory from "./Components/ProductCategory/ProductCategory";



const DashboardContainer = ({ isLoggedOut }) => {
  return (
    <Container isLoggedOut={isLoggedOut}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/create" element={<ProductCreate />} />
        <Route path="/product" element={<Product />} />
        <Route path="/category" element={<ProductCategory />} />
      </Routes>
    </Container>
  )
}

const AuthContainer = ({ auth }) => {
  return (
    <Routes>
      <Route path="/" element={<Login auth={auth} />} />
    </Routes>
  )
}


function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== "null") {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [])

  return (
    <BrowserRouter>
      <Header auth={auth} />
      {auth ? <DashboardContainer isLoggedOut={() => { setAuth(false) }} /> : <AuthContainer auth={() => { setAuth(true) }} />}
    </BrowserRouter>
  )
}

export default App
