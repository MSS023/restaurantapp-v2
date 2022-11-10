import { useEffect, useState } from 'react';
import './MenuScreen.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getMenu } from '../../services/Services';
import Switch from '../../components/Switch/Switch';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import testImage from '../../assets/testImage.jpg';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../store/OrderProvider';
import { useLoading } from '../../store/LoadingProvider';
import GreetingLoading from '../../components/GreetingLoading/GreetingLoading';
import { useSidebarShow } from '../../store/SidebarShowProvider';

function MenuScreen(props) {
	const [loading, setLoading] = useLoading();
	const [menu, setMenu] = useLocalStorage('menu', []);
	const [order, setOrder] = useOrders('order', {});
	const [activeCategoryID, setActiveCategoryID] = useState(0);
	const [veg, setVeg] = useState(true);
	const [nonVeg, setNonVeg] = useState(true);
	const [showSidebar, setShowSidebar] = useSidebarShow();
	const navigate = useNavigate();

	useEffect(() => {
		async function populate() {
			try {
				const response = await getMenu();
				if (JSON.stringify(menu) !== JSON.stringify(response)) {
					console.log('response');
					setMenu([...response]);
				}
			} catch (err) {
				console.log(err);
			}
		}
		populate();
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setLoading, setMenu]);

	function handleAddToCart(item) {
		const id = item.id;
		if (id in order) {
			setOrder((prev) => {
				return { ...prev, [id]: { num: order[id].num + 1, item: item } };
			});
		} else {
			setOrder((prev) => {
				return { ...prev, [id]: { num: 1, item: item } };
			});
		}
	}

	function handleDeleteFromCart(item) {
		const id = item.id;
		setOrder((prev) => {
			return { ...prev, [id]: { num: prev[id].num - 1, item: item } };
		});
	}

	if (loading) {
		return (
			<>
				<GreetingLoading />
			</>
		);
	}

	return (
		<div className="menu-screen d-flex h-100">
			{showSidebar ? (
				<div className="sidebar d-sm-inline-block py-5">
					<h6 className="categories-header">CATEGORIES</h6>
					<div className="categories-container d-flex flex-column gap-4 justify-content-center align-items-start">
						{menu.map((item, idx) => {
							return (
								<div className="d-flex mx-3 flex-row justify-content-start" key={idx}>
									{activeCategoryID === idx ? <hr className="selection-marker border-4 h-2" /> : ''}
									<button
										className="category outline-none border-0 bg-transparent"
										onClick={() => {
											setActiveCategoryID(idx);
											setShowSidebar(false);
										}}
									>
										{item.category}
									</button>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				''
			)}
			<div className="menu d-flex flex-column h-100 flex-fill">
				<div className="filters d-flex flex-row justify-content-center gap-4 w-100">
					<div className="filter">
						Veg <Switch checked={veg} setChecked={setVeg} />
					</div>
					<div className="filter">
						Non Veg <Switch checked={nonVeg} setChecked={setNonVeg} />
					</div>
				</div>
				<div className="dishes p-4">
					<Container className="align-items-center">
						<Row className="dish-row row-cols-auto gap-4 justify-content-center mx-auto">
							{menu[activeCategoryID]?.items?.map((item, idx) =>
								(item.type === 'veg' && veg) || (item.type === 'non-veg' && nonVeg) ? (
									<Col key={item.id} className="mx-0">
										<Card
											className="dish-card py-2 shadow"
											onClick={() => {
												setLoading(true);
												navigate(`/dine/${activeCategoryID}/${item.id}`);
											}}
										>
											<Card.Img className="dish-img mx-auto" variant="top" src={item.img || testImage} />
											<Card.Body>
												<Card.Text className="dish-price m-0">₹{item.price}</Card.Text>
												<Card.Title>{item.name}</Card.Title>
												<Card.Text className="dish-description">{item.description}</Card.Text>
											</Card.Body>
											<Card.Footer>
												{item.id in order && order[item.id].num > 0 ? (
													<>
														<Button
															className="menu-cta"
															onClick={(e) => {
																handleAddToCart(item);
																e.stopPropagation();
															}}
														>
															+
														</Button>{' '}
														{order[item.id].num}{' '}
														<Button
															className="menu-cta"
															onClick={(e) => {
																handleDeleteFromCart(item);
																e.stopPropagation();
															}}
														>
															-
														</Button>
													</>
												) : (
													<Button
														onClick={(e) => {
															handleAddToCart(item);
															e.stopPropagation();
														}}
													>
														Add to cart
													</Button>
												)}
											</Card.Footer>
										</Card>
									</Col>
								) : (
									''
								)
							)}
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
}

export default MenuScreen;
