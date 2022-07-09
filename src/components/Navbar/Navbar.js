import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Navbar.css';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { async } from '@firebase/util';

export default function Navbar() {
	const logout = async () => {
		await signOut(auth);
	};
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
			<button className="button" onClick={logout}>
				Log Out
			</button>
		</nav>
	);
}
