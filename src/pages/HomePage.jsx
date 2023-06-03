import React, { useEffect, useState } from "react";

// Styles
import "../styles/HomePage.css";

// Components.
import CharacterItemComponent from "../components/HomePageComponents/CharacterItemComponent/CharacterItemComponent";
import NavBarComponent from "../components/NavBarComponent/NavBarComponent";
import LoadingComponent from "../components/SharedComponents/LoadingComponent/LoadingComponent";
import ModalComponent from "../components/SharedComponents/ModalComponent/ModalComponent";

const PUBLIC_API_KEY = process.env.REACT_APP_PUBLIC_API_KEY;
const MD5_HASH = process.env.REACT_APP_MD5_HASH;
const BACKEND_URL = process.env.REACT_APP_MARVEL_API_URL;

export default function HomePage() {
	const [characters, setCharacters] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		getMarvelCharacters();
	}, []);
	const getMarvelCharacters = () => {
		const public_api_key = PUBLIC_API_KEY;
		const ts = 1;

		const hash = MD5_HASH;
		const marvelAPI = `${BACKEND_URL}/v1/public/characters?ts=${ts}&apikey=${public_api_key}&hash=${hash}`;

		fetch(marvelAPI)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				const { data } = result;
				const { results } = data;

				setCharacters(results);
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
			<h1>Characters</h1>
			{errorMessage ? (
				<ModalComponent
					className="error-message-div"
					message={errorMessage}
				/>
			) : loading ? (
				<div className="my-text-center my-vertical-center ">
					<LoadingComponent />
				</div>
			) : characters && characters.length > 1 ? (
				<ul className="flex-container">
					{characters.map((character) => (
						<li key={character.id}>
							<CharacterItemComponent character={character} />
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
