
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">Header</div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          Login
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;