import React from "react";

// Styles
import "./SearchComponent.css";

// Components
import MyButtonComponent from "../SharedComponents/MyButtonComponent/MyButtonComponent";

export default function SearchComponent(props) {
	const { submitHandler } = props;

	const formSubmit = (e) => {
		e.preventDefault();
		const searchVal = document.getElementById("search").value;

		if (searchVal.trim().length === 0) {
			alert("Enter a value to search");
			return;
		}

		submitHandler(searchVal);
	};

	return (
		<div>
			<form onSubmit={formSubmit}>
				<div>
					<label htmlFor="search">Search characters</label>
					<input
						id="search"
						type="search"
						inputMode="search"
						required
						autoFocus
					/>
				</div>
				<div>
					<MyButtonComponent
						text="search"
						type="submit"
					/>
				</div>
			</form>
		</div>
	);
}
