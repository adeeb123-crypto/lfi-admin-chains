import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout, getLoginUserRole } from "./store/auth/actions";
import store from "./store";
// import * as serviceWorker from "./serviceWorker";
// Check for token
// const cssRule =
// 	"color: rgb(249, 162, 34);" +
// 	"font-size: 100px;" +
// 	"font-weight: bold;" +
// 	"text-shadow: 1px 1px 5px rgb(249, 162, 34);" +
// 	"filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";

// setTimeout(console.log.bind(console, "%LFINANCE ADMIN", cssRule), 1);

if (localStorage.jwtToken) {
	const currentTime = Math.floor(Date.now() / 1000);
	const decoded = jwt_decode(localStorage.jwtToken);
	if (currentTime > decoded.exp) {
		store.dispatch(logout());
	} else {
		setAuthToken(localStorage.jwtToken);
		store.dispatch(setCurrentUser(decoded));
		store.dispatch(getLoginUserRole(decoded?.roles?.[0]?._id));
	}
} else {
	store.dispatch(logout());
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Provider store={store}>
		{/* <React.StrictMode> */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
		{/* </React.StrictMode> */}
	</Provider>
);

// serviceWorker.register();
