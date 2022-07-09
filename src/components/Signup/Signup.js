import loginImage from '../../images/signup.svg';
import googleIcon from '../../images/google.svg';
import facebookIcon from '../../images/facebook.svg';

import { auth } from '../../firebase-config';

import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export default function Signup() {
	const [user, setUser] = useState({ email: '' });

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	});

	const [data, setData] = useState({
		password: '',
		email: '',
	});
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

	function handleSubmit(e) {
		e.preventDefault();

		if (!errors.password && !errors.email) {
			createUserWithEmailAndPassword(auth, data.email, data.password)
				.then(console.log('Signed up'))
				.catch((error) => {
					console.log(error);
				});
		}
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
						{user && user.email}
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
						<button className="auth-btn button">Sign Up</button>
					</form>
					<p className="alternative">
						Already have an account? <a href="/login">Log in here</a>
					</p>
				</div>
			</div>
		</section>
	);
}
