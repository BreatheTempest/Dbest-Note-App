import loginImage from '../../images/signup.svg';
import googleIcon from '../../images/google.svg';
import facebookIcon from '../../images/facebook.svg';

import { useState, useEffect } from 'react';

import { useAuth } from '../../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
	const { signup } = useAuth();

	const navigate = useNavigate();

	const [data, setData] = useState({
		password: '',
		email: '',
	});

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		password: false,
		email: false,
	});

	function handleInput(e) {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	useEffect(() => {
		if (data.email !== '')
			setErrors((prevErrors) => ({
				...prevErrors,
				email: !/.+@.+\..+/.test(data.email),
			}));
		if (data.password !== '')
			setErrors((prevErrors) => ({
				...prevErrors,
				password: data.password.length < 6,
			}));
	}, [data]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!errors.password && !errors.email) {
			try {
				setError('');
				setLoading(true);
				await signup(data.email, data.password);
				navigate('/', { replace: true });
			} catch {
				setError('Failed to create an account');
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
					<h2>Signup</h2>
					<p>
						If you are already a member you can login with your email address
						and password.
					</p>
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
						{error}
						<div className="from-element">
							<div className="label">
								<label htmlFor="email">Email</label>
								<p className={errors.email ? 'visible' : ''}>Invalid Email</p>
							</div>
							<input
								onChange={handleInput}
								type="text"
								name="email"
								className="form-input"
								value={data.email}
								required
							/>
						</div>
						<div className="from-element">
							<div className="label">
								<label htmlFor="Password">Password</label>
								<p className={errors.password ? 'visible' : ''}>
									Must be at least 6 characters long
								</p>
							</div>
							<input
								onChange={handleInput}
								type="password"
								name="password"
								className="form-input"
								value={data.password}
								required
								autoComplete="password"
							/>
						</div>
						<button disabled={loading} className="auth-btn button">
							Sign Up
						</button>
					</form>
					<p className="alternative">
						Already have an account? <Link to="/login">Log in here</Link>
					</p>
				</div>
			</div>
		</section>
	);
}

// "homepage": "http://BreatheTempest.github.io/Dbest-Note-App",
