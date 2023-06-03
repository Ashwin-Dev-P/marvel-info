import React, { useState } from "react";

import "./AccordionComponent.css";

function AccordianComponent(props) {
	const { title, content } = props;
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="accordion">
			<div className="accordion-item">
				<div
					className="accordion-title-div"
					onClick={() => setIsActive(!isActive)}>
					<span className="accordian-title-content">{title}</span>
					<span className="expand-btn">{isActive ? "-" : "+"}</span>
				</div>
				{isActive && (
					<div className="accordion-content">
						{content ? content : "No description available for this comic"}
					</div>
				)}
			</div>
		</div>
	);
}

export default AccordianComponent;
