
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
const NavLinks = props => {
   
const auth = useContext(AuthContext);

return <ul className="nav-links">
  <li>
      <NavLink to="/" exact>ALL PRODUCTS</NavLink>
  </li>
  {auth.isLoggedIn && (
    <li>
      <NavLink to="/myproducts" exact>MY PRODUCTS</NavLink>
    </li>
  )}
  {auth.isLoggedIn && (
    <li>
      <NavLink to="/products/new">ADD PRODUCT</NavLink>
    </li>
  )}
  {!auth.isLoggedIn && (
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
  )}
  {auth.isLoggedIn && (
    <li>
      <button onClick={auth.logout}>LOGOUT</button>
    </li>
  )}
</ul>
};
export default NavLinks;