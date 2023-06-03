import React from "react";

function ModalComponent(props) {
	const { message, className } = props;
	return (
		<dialog
			open
			className={className}>
			{message}
		</dialog>
	);
}

export default ModalComponent;
