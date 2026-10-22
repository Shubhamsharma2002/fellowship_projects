
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      borderBottom: '1px solid #333',
      backgroundColor: '#000',
      color: '#fff'
    }}>
      <h3 style={{ margin: 0, fontWeight: 500 }}>Header</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <NavLink 
          to="/signup" 
          style={({ isActive }) => ({
            color: '#fff',
            textDecoration: 'none',
            borderBottom: isActive ? '2px solid #fff' : 'none',
            paddingBottom: '4px'
          })}
        >
          Signup
        </NavLink>
        <NavLink 
          to="/profile" 
          style={({ isActive }) => ({
            color: '#fff',
            textDecoration: 'none',
            borderBottom: isActive ? '2px solid #fff' : 'none',
            paddingBottom: '4px'
          })}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;