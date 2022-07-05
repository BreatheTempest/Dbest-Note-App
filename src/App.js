import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Notes from './components/Notes/Notes';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';

export default function App() {
	return (
		<div className="container">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="notes" element={<Notes />}>
					<Route path=":note" element={<Notes />} />
				</Route>
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</div>
	);
}
