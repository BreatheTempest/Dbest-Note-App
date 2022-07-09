import './Login.css';
import loginImage from '../../images/login.svg';
import googleIcon from '../../images/google.svg';
import facebookIcon from '../../images/facebook.svg';

import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from 'react';

export default function Login() {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const [data, setData] = useState({
		password: '',
		email: '',
	});
	const [errors, setErrors] = useState({
		email: false,
		success: false,
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
	}, [data]);

	function handleSubmit(e) {
		e.preventDefault();

		if (!errors.name && !errors.email) {
			signInWithEmailAndPassword(auth, data.email, data.password)
				.then((e) => console.log(e.user))
				.catch((err) => console.log(err.message));
		}
	}

	return (
		<section className="auth-page">
			<div className="auth-img">
				<img src={loginImage} alt="" />
			</div>
			<div className="form-half">
				<div className="auth-container">
					{/* {user.email} */}
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
									Invalid Password
								</p>
							</div>
							<input
								onChange={handleInput}
								type="password"
								name="password"
								className="form-input"
								value={data.password}
								required
							/>
						</div>
						<button className="auth-btn button">Log In</button>
					</form>
					<p className="alternative">
						Don't have an account? <a href="/signup">Sign up here</a>
					</p>
				</div>
			</div>
		</section>
	);
}
