import React, { useState } from "react";

// Components
import SearchComponent from "../components/SearchComponent/SearchComponent";
import NavBarComponent from "../components/NavBarComponent/NavBarComponent";
import CharacterItemComponent from "../components/HomePageComponents/CharacterItemComponent/CharacterItemComponent";
import LoadingComponent from "../components/SharedComponents/LoadingComponent/LoadingComponent";
import ModalComponent from "../components/SharedComponents/ModalComponent/ModalComponent";

const PUBLIC_API_KEY = process.env.REACT_APP_PUBLIC_API_KEY;
const MD5_HASH = process.env.REACT_APP_MD5_HASH;
const BACKEND_URL = process.env.REACT_APP_MARVEL_API_URL;

export default function SearchPage() {
	const [characters, setCharacters] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [firstSearchDone, setFirstSearchDone] = useState(false);

	const getMarvelCharacters = (characterName) => {
		const public_api_key = PUBLIC_API_KEY;
		const ts = 1;

		const hash = MD5_HASH;
		const marvelAPI = `${BACKEND_URL}/v1/public/characters?ts=${ts}&apikey=${public_api_key}&hash=${hash}&nameStartsWith=${characterName}`;

		setLoading(true);
		setFirstSearchDone(true);

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

	const submitHandler = (characterName) => {
		getMarvelCharacters(characterName);
	};

	return (
		<div>
			<NavBarComponent />
			<SearchComponent submitHandler={submitHandler} />

			{errorMessage ? (
				<ModalComponent
					className="error-message-div"
					message={errorMessage}
				/>
			) : loading ? (
				<div className="my-text-center my-py-5">
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
			) : firstSearchDone ? (
				<div className="my-my-5">
					<ModalComponent message="No characters found" />
				</div>
			) : null}
		</div>
	);
}
