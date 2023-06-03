import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

// Styles
import "../styles/LoginPage.css";

// Components
import LoginFormComponent from "../components/LoginPageComponents/LoginFormComponent/LoginFormComponent";

// Utils
import getURLParams from "../utils/getURLParams";
import isLoggedIn from "../utils/isLoggedIn";

// Context
import { AppContext } from "../App";

function LoginPage() {
	const loginAttempted = getURLParams("login-attempted");

	// Redirects you to home page if already loggedIn
	const { appData, setAppData } = useContext(AppContext);
	if (isLoggedIn()) {
		// loggedIn is set in App state since it gets removed if the page is refreshed when user tries to manually enter the login page
		setAppData({
			...appData,
			loggedIn: true,
		});

		var redirectPath = getURLParams("redirect");

		if (redirectPath === null) {
			redirectPath = "/";
		}
		return <Navigate to={`${redirectPath}`} />;
	}

	return (
		<div className="login-form-container">
			<LoginFormComponent
				loginAttempted={loginAttempted === "true" ? true : false}
			/>
		</div>
	);
}
export default LoginPage;
