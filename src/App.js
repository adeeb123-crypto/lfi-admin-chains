import PropTypes from "prop-types";
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
// Import Routes all
import { userRoutes, authRoutes } from "./routes";
import PrivateRoute from "./common/PrivateRoute";
import Error404 from "./pages/Errors/Error404";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/preloader.scss";
import "./common/reactDataTable.scss";

const App = (props) => {
	function getLayout() {
		let layoutCls = VerticalLayout;
		switch (props.layout.layoutType) {
			case "horizontal":
				layoutCls = HorizontalLayout;
				break;
			default:
				layoutCls = VerticalLayout;
				break;
		}
		return layoutCls;
	}

	const Layout = getLayout();
	return (
		<React.Fragment>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<ToastContainer />
			<Router>
				<Switch>
					{authRoutes.map((route, idx) => (
						<Route
							key={idx}
							exact={route.exact ? false : true}
							path={route.path}
							render={(props) => (
								<NonAuthLayout>
									<route.component {...props} />{" "}
								</NonAuthLayout>
							)}
						/>
					))}
					{userRoutes.map((route, idx) => (
						<PrivateRoute
							key={idx}
							path={route.path}
							Layout={Layout}
							Component={route.component}
							permission={route.permission}
							exact={route.exact ? true : false}
						/>
					))}

					{/* 👇️ only match this when no other routes match */}
					<Route
						path="*"
						render={(props) => <Error404 {...props} />}
					/>
				</Switch>
			</Router>
		</React.Fragment>
	);
};

App.propTypes = {
	layout: PropTypes.any,
};

const mapStateToProps = (state) => {
	return {
		layout: state.Layout,
	};
};
export default connect(mapStateToProps, null)(App);
