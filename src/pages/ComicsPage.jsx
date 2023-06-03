import React, { useEffect, useState } from "react";

// Components
import NavBarComponent from "../components/NavBarComponent/NavBarComponent";
import AccordionComponent from "../components/SharedComponents/AccordionComponent/AccordionComponent";
import LoadingComponent from "../components/SharedComponents/LoadingComponent/LoadingComponent";
import ModalComponent from "../components/SharedComponents/ModalComponent/ModalComponent";

const PUBLIC_API_KEY = process.env.REACT_APP_PUBLIC_API_KEY;
const MD5_HASH = process.env.REACT_APP_MD5_HASH;
const BACKEND_URL = process.env.REACT_APP_MARVEL_API_URL;

export default function ComicsPage() {
	const [comics, setComics] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		getComics();
	}, []);

	const getComics = () => {
		const public_api_key = PUBLIC_API_KEY;
		const ts = 1;

		const hash = MD5_HASH;
		const marvelAPI = `${BACKEND_URL}/v1/public/comics?ts=${ts}&apikey=${public_api_key}&hash=${hash}`;

		fetch(marvelAPI)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				const { data } = result;
				const { results } = data;

				setComics(results);
				setLoading(false);
			})
			.catch((error) => {
				console.log("online", navigator.onLine);
				if (!navigator.onLine) {
					setErrorMessage("Check your internet connection");
				} else {
					setErrorMessage(error.message);
				}

				setLoading(false);
			});
	};

	return (
		<div>
			<NavBarComponent />
			<h1>Comics</h1>
			{errorMessage ? (
				<ModalComponent
					className="error-message-div"
					message={errorMessage}
				/>
			) : loading ? (
				<div className="my-text-center my-vertical-center ">
					<LoadingComponent />
				</div>
			) : comics && comics.length > 1 ? (
				<ul>
					{comics.map((comic) => (
						<li key={comic.id}>
							<AccordionComponent
								title={comic.title}
								content={comic.description}
							/>
						</li>
					))}
				</ul>
			) : (
				<div>
					<ModalComponent message="No characters found" />
				</div>
			)}
		</div>
	);
}
