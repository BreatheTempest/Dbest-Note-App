import React, { useEffect, useState } from 'react';
import './Contact.css';

export default function Contact() {
	const [data, setData] = useState({
		name: '',
		email: '',
		title: '',
		message: '',
	});
	const [errors, setErrors] = useState({
		name: false,
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
		setErrors((prevErrors) => ({
			...prevErrors,
			name: !/^[a-zA-Z]+$/.test(data.name),
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
		<form className="contact" onSubmit={(e) => handleSubmit(e)}>
			<h2 className="span-two">Contact</h2>
			<div className="form-element">
				<div className="label">
					<label htmlFor="name">Name</label>
					<p className={errors.name ? 'visible' : ''}>
						Must contain only letters
					</p>
				</div>
				<input
					onChange={handleInput}
					type="text"
					name="name"
					className="form-input"
					value={data.name}
					required
				/>
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
			<div className="from-element span-two">
				<label htmlFor="title">Title</label>
				<input
					onChange={handleInput}
					type="text"
					name="title"
					value={data.title}
					className="form-input"
					required
				/>
			</div>
			<div className="from-element span-two">
				<label htmlFor="message">Your Message</label>
				<textarea
					onChange={handleInput}
					name="message"
					id="message"
					value={data.message}
					className="form-input"
					required
				></textarea>
			</div>
			<button className="button">Post Comment</button>
			<div className={`success ${errors.success ? 'visible' : ''}`}>
				<h2>Message sent!</h2>
				<p>Thank you for your time</p>
				<button
					className="button"
					onClick={() =>
						setErrors({
							name: false,
							email: false,
							success: false,
						})
					}
				>
					Close
				</button>
			</div>
		</form>
	);
}
