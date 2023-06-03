import React from "react";

// Styles
import "./CharacterItemComponent.css";

export default function CharacterItemComponent(props) {
	const { character } = props;
	const { name, thumbnail } = character;

	const { path, extension } = thumbnail;
	return (
		<div className="my-card">
			<div className="my-card-img">
				<img
					src={`${path}.${extension}`}
					width={"100%"}
					height={"100%"}
					alt={name}
				/>
			</div>
			<div className="my-card-body">{name}</div>
		</div>
	);
}
