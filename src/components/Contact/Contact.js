import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
	const [data, setData] = useState({
		name: '',
		email: '',
		title: '',
		message: '',
	});

	function handleInput(e) {
		console.log(data);
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		const { name, value } = e.target;
	}

	return (
		<form className="contact">
			<h2 className="span-two">Contact</h2>
			<div className="form-element">
				<label htmlFor="name">Name*</label>
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
				<label htmlFor="email">Email*</label>
				<input
					onChange={handleInput}
					type="email"
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
				></textarea>
			</div>
			<button className="button">Post Comment</button>
		</form>
	);
}
