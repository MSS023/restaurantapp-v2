import { useEffect, useState } from 'react';
import { Button, Navbar, NavLink } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Navigator from './navigator/Navigator';
import { useLoading } from './store/LoadingProvider';
import { OrderProvider } from './store/OrderProvider';
import { useSidebarShow } from './store/SidebarShowProvider';

function App() {
	const setLoading = useLoading()[1];
	const [showOrder, setShowOrder] = useState(false);
	const location = useLocation();
	const [showSidebar, setShowSidebar] = useSidebarShow();

	function handleShowOrder() {
		setShowOrder(true);
	}

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [setLoading]);

	return (
		<OrderProvider>
			<div className="App d-flex flex-column">
				<Navbar className="navbar px-2 d-flex justify-content-between">
					<div className="d-flex gap-1 align-items-center">
						{location.pathname.split('/')[1] === 'dine' ? (
							<Link to="/menu">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-arrow-left"
									viewBox="0 0 16 16"
								>
									<path
										fillRule="evenodd"
										d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
									/>
								</svg>
							</Link>
						) : (
							<Button
								variant="transparent"
								className="d-sm-none d-inline"
								onClick={() => {
									setShowSidebar(!showSidebar);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-list"
									viewBox="0 0 16 16"
								>
									<path
										fill-rule="evenodd"
										d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
									/>
								</svg>
							</Button>
						)}
						<Navbar.Brand>The Restro</Navbar.Brand>
					</div>
					<NavLink onClick={handleShowOrder}>
						Order Summary{' '}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-cart2"
							viewBox="0 0 16 16"
						>
							<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
						</svg>
					</NavLink>
				</Navbar>
				<OrderStatus showOrder={[showOrder, setShowOrder]} />
				<Navigator />
			</div>
		</OrderProvider>
	);
}

export default App;
