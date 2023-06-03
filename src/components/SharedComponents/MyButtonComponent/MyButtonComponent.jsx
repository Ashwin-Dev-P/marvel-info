import React from "react";

function MyButtonComponent(props) {
	const { text, id, name, onClick } = props;

	var { type } = props;
	if (!type) {
		type = "button";
	}
	return (
		<>
			{onClick ? (
				<button
					id={id}
					name={name}
					type={type}
					onClick={onClick}>
					{text}
				</button>
			) : (
				<button
					id={id}
					name={name}
					type={type}>
					{text}
				</button>
			)}
		</>
	);
}
export default MyButtonComponent;
