import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import auth from "./auth/reducer";
import launchpadOption from "./launchpadOption/reducer";
import launchpad from "./launchpad/reducer";
import admin from "./admin/reducer";
import dashboard from "./dashboard/reducer";
import networkInfo from "./networkInfo/reducer";
import  bridge from "./bridge/reducer"
import chains from "./chains/reducer"

const rootReducer = combineReducers({
	Layout,
	auth,
	launchpadOption,
	launchpad,
	admin,
	dashboard,
	networkInfo,
	bridge,
	chains
});

export default rootReducer;
