import './Login.css';
import loginImage from '../../images/login.svg';

import { useState, useEffect } from 'react';

export default function Login() {
	const [data, setData] = useState({
		name: '',
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
			setData({
				name: '',
				email: '',
				title: '',
				message: '',
			});
			setErrors({
				name: false,
				email: false,
				success: true,
			});
		}
	}

	return (
		<section className="auth-page">
			<div className="auth-img">
				<img src={loginImage} alt="" />
			</div>
			<div className="auth-container">
				<h2>Account Login</h2>
				<form className="auth-form" onSubmit={handleSubmit}>
					<button className="alt-auth-btn ">Google account</button>
					<button className="alt-auth-btn ">Facebook account</button>
					<p className="line">Or</p>
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
							<p className={errors.email ? 'visible' : ''}>Invalid Password</p>
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
					<button className="auth-btn button">Login</button>
				</form>
				<p>
					Don't have an account? <a href="/signup">Sign up here</a>
				</p>
			</div>
		</section>
	);
}
