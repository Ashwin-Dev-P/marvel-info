import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

// Styles
import "./NavBarComponent.css";

// Context
import { AppContext } from "../../App";

// Components
import HamburgComponent from "../HamburgComponent/HamburgComponent";
import MyButtonComponent from "../SharedComponents/MyButtonComponent/MyButtonComponent";

// Images
const logo = require("../../assets/Marvel_Logo.png");

export default function NavBarComponent() {
	const { appData, setAppData } = useContext(AppContext);
	const [logoutClicked, setLogoutClicked] = useState(false);

	const hamburgClickHandler = () => {
		const topNavBar = document.getElementById("topNavBar");
		const hamburgBtnLi = document.getElementById("hamburg-btn-li");
		if (topNavBar.className === "") {
			topNavBar.className += "expand";
			hamburgBtnLi.className = "";
		} else {
			topNavBar.className = "";
			hamburgBtnLi.className = "hamburg-compressed";
		}
	};

	const logoutHandler = () => {
		console.info("Logged out");
		setAppData({
			...appData,
			loggedIn: false,
		});

		sessionStorage.removeItem("loggedIn");

		setLogoutClicked(true);
	};

	if (!appData.loggedIn) {
		if (logoutClicked) {
			// Navigate to login page without any warning if logout btn is clicked
			return <Navigate to="/login" />;
		} else {
			// Navigate to login page with warning if user tries to reach page without logging in
			return (
				<Navigate
					to={`/login?login-attempted=true&redirect=${window.location.pathname}`}
				/>
			);
		}
	}
	return (
		<nav id="topNavBar">
			<ul>
				<li className="logo-li">
					<a href="/">
						<img
							src={logo}
							width={"100%"}
							className="logo"
							alt="Marvel logo"
						/>
					</a>
				</li>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/comics">Comics</Link>
				</li>
				<li>
					<Link to="/search">Search</Link>
				</li>
				<li>
					<MyButtonComponent
						text="logout"
						onClick={logoutHandler}
					/>
				</li>
				<li
					className="hamburg-compressed"
					id="hamburg-btn-li">
					<span onClick={hamburgClickHandler}>
						<HamburgComponent />
					</span>
				</li>
			</ul>
		</nav>
	);
}
