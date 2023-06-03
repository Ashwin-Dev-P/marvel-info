import React, { useContext } from "react";

// Components
import MyButtonComponent from "../../SharedComponents/MyButtonComponent/MyButtonComponent";

// Context
import { AppContext } from "../../../App";

// CSS
import "./LoginFormComponent.css";
import { Navigate } from "react-router-dom";

function LoginFormComponent(props) {
	const { loginAttempted } = props;

	const { appData, setAppData } = useContext(AppContext);
	const { loggedIn } = appData;

	if (loggedIn) {
		console.info("Logged in");
		return <Navigate to="/" />;
	}

	const submitHandler = (e) => {
		e.preventDefault();
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		const data = {
			email: email,
			password: password,
		};

		console.info("Data to be sent to back end:", data);

		setAppData({
			...appData,
			loggedIn: true,
		});
		sessionStorage.setItem("loggedIn", true);
	};
	return (
		<form onSubmit={submitHandler}>
			<div>
				<label htmlFor="email">E-mail ID</label>
				<input
					id="email"
					type="email"
					inputMode="email"
					required
					autoFocus
				/>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					id="password"
					inputMode="text"
					minLength={8}
					required
				/>
			</div>
			<div>
				<MyButtonComponent
					type="submit"
					text="Login"
				/>
			</div>

			{loginAttempted ? (
				<div className="error-message-div my-text-center">
					Login to continue
				</div>
			) : null}

			<div className="my-text-center login-info">
				Enter any valid E-mail ID and a 8 character password to login
			</div>
		</form>
	);
}
export default LoginFormComponent;
