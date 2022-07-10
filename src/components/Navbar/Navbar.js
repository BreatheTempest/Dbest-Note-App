import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
	const { currentUser, logout } = useAuth();
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const handleLogout = async () => {
		setError('');
		try {
			await logout();
			navigate('/login');
		} catch {
			setError('Failed to log out');
		}
	};
	return (
		<nav style={{ display: currentUser ? '' : 'none' }}>
			<div className="logo">
				<img src={logo} alt="" />
				<div className="logo-text">Logo</div>
			</div>
			<div className="nav-container">
				<p>Hello {currentUser && currentUser.email}!</p>
				<NavLink to="/">Home</NavLink>
				<NavLink to="notes">Notes</NavLink>
				<NavLink to="contact">Contact</NavLink>
			</div>
			<button className="button" onClick={handleLogout}>
				Log Out
			</button>
		</nav>
	);
}
