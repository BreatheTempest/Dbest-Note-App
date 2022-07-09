import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Notes from './components/Notes/Notes';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { useState } from 'react';

export default function App() {
	const [permitted, setPermitted] = useState(true);
	return (
		<div className="container">
			{permitted && <Navbar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="notes" element={<Notes />}>
					<Route path=":note" element={<Notes />} />
				</Route>
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<PageNotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}
