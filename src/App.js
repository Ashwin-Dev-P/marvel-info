import { RouterProvider } from "react-router-dom";

// Context
import { useState, createContext } from "react";

// Routes
import router from "./routes/Routes";

// CSS
import "./styles/Common.css";
import "./App.css";

export const AppContext = createContext();

function App() {
	const [appData, setAppData] = useState({ loggedIn: false });

	return (
		<AppContext.Provider
			value={{
				appData,
				setAppData,
			}}>
			<main>
				<RouterProvider
					router={router}
					appData={appData}
				/>
			</main>
		</AppContext.Provider>
	);
}

export default App;
