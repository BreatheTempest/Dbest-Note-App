import React from 'react';

export default function Contact() {
	return (
		<form className="contact">
			<h2 className="span-two">Contact</h2>
			<div className="form-element">
				<label htmlFor="name">Name*</label>
				<input type="text" name="name" required />
			</div>
			<div className="from-element">
				<label htmlFor="email">Email*</label>
				<input type="email" name="email" required />
			</div>
			<div className="from-element span-two">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" />
			</div>
			<div className="from-element span-two">
				<label htmlFor="message">Your Message</label>
				<textarea name="message" id="message"></textarea>
			</div>
			<button>Post Comment</button>
		</form>
	);
}
