import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Image1 from "./components/Image1";
import Image2 from "./components/Image2";
import Image3 from "./components/Image3";

const router = createBrowserRouter([
	{ path: "/", element: <HomePage /> },
	{ path: "/image", element: <Image1 /> },
	{ path: "/image2", element: <Image2 /> },
	{ path: "/image3", element: <Image3 /> },
]);

export default router;