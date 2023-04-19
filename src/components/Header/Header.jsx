import React, { useContext } from "react";
import "./Header.css";
import logo from "../../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () =>{
    logOut()
    .then(result => {})
    .catch(error =>{
      console.error(error.message)
    })
  }
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        {user && <span className="text-white">Welcome {user.email}
            <button onClick={handleLogOut}>Log Out</button>
            </span>
          }
      </div>
    </nav>
  );
};

export default Header;
