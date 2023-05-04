const environment = process.env.ENVIRONMENT;
let apiUri = "https://api-staging.lfi.io";
let wsLink = "ws://localhost:8090";
let apiUriBridge = "http://10.101.12.135:5000/bridgeserver-lfi/admin";
let apiUriChains = "http://10.101.12.135:5000/bridgeserver-lfi/admin";

if (environment === "production") {
	apiUri = process.env.API_URL;
	wsLink = "ws://localhost:8090";
	apiUriBridge = "http://10.101.12.135:5000/bridgeserver-lfi/admin";
	
}
if (environment === "development") {
}
apiUri = "https://api-staging.lfi.io";
wsLink = "ws://localhost:8090";
apiUriBridge = "http://10.101.12.135:5000/bridgeserver-lfi/admin";

// apiUri = "https://api-staging.lfi.io";
// wsLink = "wss://socket-staging.lfi.io";
export const apiUrl = apiUri;
export const wsUrl = wsLink;
export const apiBridgeUrl = apiUriBridge;
export const apiChainsUrl = apiUriChains;
