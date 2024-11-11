import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
	cyan,
	blue,
	teal,
	purple,
	pink,
	amber,
	lightGreen,
	lime,
} from "@mui/material/colors";

import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: blue[900],
		},
		secondary: {
			main: teal[500],
		},
		info: {
			main: cyan[500],
		},
		alpha: { main: purple[400] },
		beta: { main: pink[400] },
		gamma: { main: amber[400] },
		delta: { main: lightGreen[400] },
		phi: { main: lime[400] },
	},
	cssVariables: true,
});
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>
);
