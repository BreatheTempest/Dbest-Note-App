import './Login.css';
import loginImage from '../../images/login.svg';
import googleIcon from '../../images/google.svg';
import facebookIcon from '../../images/facebook.svg';

import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		password: '',
		email: '',
	});

	function handleInput(e) {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await login(data.email, data.password);
			navigate('/', { replace: true });
		} catch (err) {
			if (err.code === 'auth/user-not-found') {
				setError('User not found');
			} else if (err.code === 'auth/wrong-password') {
				setError('Wrong Password');
			} else {
				setError('Something went wrong');
			}
		}
		setLoading(false);
	}

	return (
		<section className="auth-page">
			<div className="auth-img">
				<img src={loginImage} alt="" />
			</div>
			<div className="form-half">
				<div className="auth-container">
					<h2>Account Login</h2>
					<form className="auth-form" onSubmit={handleSubmit}>
						<button className="alt-auth-btn">
							<img src={googleIcon} alt="" /> Google account
						</button>
						<button className="alt-auth-btn">
							<img src={facebookIcon} alt="" />
							Facebook account
						</button>
						<div className="line">
							<p>Or</p>
						</div>
						{error === 'Something went wrong' ? <p>{error}</p> : ''}
						<div className="from-element">
							<div className="label">
								<label htmlFor="email">Email</label>
								<p className={`${error === 'User not found' ? 'visible' : ''}`}>
									{error}
								</p>
							</div>
							<input
								onChange={handleInput}
								type="text"
								name="email"
								className="form-input"
								value={data.email}
								required
								autoComplete="email"
							/>
						</div>
						<div className="from-element">
							<div className="label">
								<label htmlFor="Password">Password</label>
								<p className={`${error !== 'User not found' ? 'visible' : ''}`}>
									{error}
								</p>
							</div>
							<input
								onChange={handleInput}
								type="password"
								name="password"
								className="form-input"
								value={data.password}
								required
								autoComplete="current-password"
							/>
						</div>
						<button disabled={loading} className="auth-btn button">
							Log In
						</button>
					</form>
					<p className="alternative">
						Don't have an account? <Link to="/signup">Sign up here</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
