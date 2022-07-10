import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Notes from './components/Notes/Notes';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import AuthProvider from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

export default function App() {
	return (
		<div className="container">
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="notes"
						element={
							<RequireAuth>
								<Notes />
							</RequireAuth>
						}
					>
						<Route path=":note" element={<Notes />} />
					</Route>
					<Route
						path="/contact"
						element={
							<RequireAuth>
								<Contact />
							</RequireAuth>
						}
					/>
					<Route path="*" element={<PageNotFound />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}
