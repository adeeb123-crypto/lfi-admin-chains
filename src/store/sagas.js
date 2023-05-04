import { all, fork } from "redux-saga/effects";

//public
import AuthSaga from "./auth/saga";
import LayoutSaga from "./layout/saga";
import launchpadOptionSaga from "./launchpadOption/saga";
import networkInfoSaga from "./networkInfo/saga";
import launchpadSaga from "./launchpad/saga";
import adminSaga from "./admin/saga";
import dashboardSaga from "./dashboard/saga";
import bridgeSaga from "./bridge/saga"
import chaninsSaga from "./chains/saga"

export default function* rootSaga() {
	yield all([
		fork(AuthSaga),
		fork(LayoutSaga),
		fork(launchpadOptionSaga),
		fork(launchpadSaga),
		fork(adminSaga),
		fork(dashboardSaga),
		fork(networkInfoSaga),
		fork(bridgeSaga),
		fork(chaninsSaga)
	]);
}
