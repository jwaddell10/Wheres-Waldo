import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Image1 from "./components/Image1";
import Image2 from "./components/Image2";
import Image3 from "./components/Image3";
import LeaderBoard from "./components/LeaderBoard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <NavBar />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/leaderboard", element: <LeaderBoard />},
			{ path: `/image/${import.meta.env.VITE_IMAGE_ID}/leaderboard`, element: <LeaderBoard /> },
			{ path: `/image/${import.meta.env.VITE_IMAGE2_ID}/leaderboard`, element: <LeaderBoard /> },
			{ path: `/image/${import.meta.env.VITE_IMAGE3_ID}/leaderboard`, element: <LeaderBoard /> },
			{ path: `/image/${import.meta.env.VITE_IMAGE_ID}`, element: <Image1 /> },
			{ path: `/image/${import.meta.env.VITE_IMAGE2_ID}`, element: <Image2 /> },
			{ path: `/image/${import.meta.env.VITE_IMAGE3_ID}`, element: <Image3 /> },
		],
	},
]);

export default router;
