import { createBrowserRouter } from "react-router-dom";

// Pages
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ComicsPage from "../pages/ComicsPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/comics",
		element: <ComicsPage />,
	},
	{
		path: "/search",
		element: <SearchPage />,
	},
]);

export default router;
