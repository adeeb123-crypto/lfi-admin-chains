import axios from "axios";
const setAuthToken = (token) => {
	// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
	if (token) {
		// Apply to every request
		axios.defaults.headers.common["Authorization"] = token;
	} else {
		// Remove token from request
		delete axios.defaults.headers.common["Authorization"];
		axios.defaults.headers.common["Authorization"] = null;
	}
};

export default setAuthToken;
