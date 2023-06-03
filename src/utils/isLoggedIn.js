function isLoggedIn() {
	return sessionStorage.getItem("loggedIn", true);
}
export default isLoggedIn;
