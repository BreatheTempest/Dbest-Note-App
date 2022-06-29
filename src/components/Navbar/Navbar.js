import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Navbar.css';

export default function Navbar() {
	return (
		<nav>
			<div className="logo">
				<img src={logo} alt="" />
				<div className="logo-text">Logo</div>
			</div>
			<div className="nav-container">
				<NavLink to="/">Home</NavLink>
				<NavLink to="notes">Notes</NavLink>
				<NavLink to="contact">Contact</NavLink>
			</div>
		</nav>
	);
}
