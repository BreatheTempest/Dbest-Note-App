import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Notes from './components/Notes';
import Home from './components/Home';
import Contact from './components/Contact';

export default function App() {
	return (
		<div className="container">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/notes" element={<Notes />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</div>
	);
}
