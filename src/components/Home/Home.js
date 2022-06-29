import orange from '../../images/orange.png';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
	const navigate = useNavigate();

	return (
		<section className="home-page">
			<h1>Welcome to the Best Note-App</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu
				dui. Lorem ipsum dolor sit amet, consectetur adipisce placerat mauris
				nisl. Proin vitae urna eu{' '}
				<span className="highlight">sem pellentesque</span> laoreet.{' '}
			</p>
			<img src={orange} alt="" />
			<button className="button" onClick={() => navigate('notes')}>
				Go to Notes
			</button>
		</section>
	);
}
