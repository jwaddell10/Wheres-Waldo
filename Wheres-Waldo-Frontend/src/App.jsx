import { RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import router from "./Routes";

function App() {
	const [width, setWidth] = useState(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);
	
	const isMobile = width <= 600;

	if (isMobile) {
		return <div>Sorry, this app is not accessible on devices less than 600 px</div>
	}

	return <RouterProvider router={router} />;
}

export default App;
