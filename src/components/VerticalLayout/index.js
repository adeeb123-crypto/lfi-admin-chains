import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
	changeLayout,
	changeSidebarTheme,
	changeSidebarType,
	changeTopbarTheme,
	changeLayoutWidth,
	changelayoutMode,
	showRightSidebarAction,
} from "../../store/layout/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "../CommonForBoth/RightSidebar";

//redux
import { useSelector, useDispatch } from "react-redux";
const Layout = (props) => {
	const dispatch = useDispatch();

	const {
		isPreloader,
		layoutWidth,
		leftSideBarType,
		topbarTheme,
		leftSideBarTheme,
		layoutMode,
		layoutType,
		leftSidebarTypes,
		showRightSidebar,
	} = useSelector((state) => ({
		isPreloader: state.Layout.isPreloader,
		leftSideBarType: state.Layout.leftSideBarType,
		layoutWidth: state.Layout.layoutWidth,
		topbarTheme: state.Layout.topbarTheme,
		leftSideBarTheme: state.Layout.leftSideBarTheme,
		layoutMode: state.Layout.layoutMode,
		layoutType: state.Layout.layoutType,
		leftSidebarTypes: state.Layout.leftSidebarTypes,
		showRightSidebar: state.Layout.showRightSidebar,
	}));

	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	const toggleMenuCallback = () => {
		if (leftSideBarType === "default") {
			dispatch(changeSidebarType("condensed", isMobile));
		} else if (leftSideBarType === "condensed") {
			dispatch(changeSidebarType("default", isMobile));
		}
	};

	//hides right sidebar on body click
	const hideRightbar = (event) => {
		var rightbar = document.getElementById("right-bar");
		//if clicked in inside right bar, then do nothing
		if (rightbar && rightbar.contains(event.target)) {
			return;
		} else {
			//if clicked in outside of rightbar then fire action for hide rightbar
			dispatch(showRightSidebarAction(false));
		}
	};

	useEffect(() => {
		//init body click event fot toggle rightbar
		document.body.addEventListener("click", hideRightbar, true);

		if (isPreloader === true) {
			document.getElementById("preloader").style.display = "block";

			setTimeout(function () {
				document.getElementById("preloader").style.display = "none";
			}, 2500);
		} else {
			document.getElementById("preloader").style.display = "none";
		}
	}, [isPreloader]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		dispatch(changeLayout("vertical"));
	}, [dispatch]);

	useEffect(() => {
		if (leftSideBarTheme) {
			dispatch(changeSidebarTheme(leftSideBarTheme));
		}
	}, [leftSideBarTheme, dispatch]);

	useEffect(() => {
		if (layoutMode) {
			dispatch(changelayoutMode(layoutMode, layoutType));
		}
	}, [layoutMode, dispatch, layoutType]);

	useEffect(() => {
		if (leftSidebarTypes) {
			dispatch(changeSidebarType(leftSidebarTypes));
		}
	}, [leftSidebarTypes, dispatch]);

	useEffect(() => {
		if (layoutWidth) {
			dispatch(changeLayoutWidth(layoutWidth));
		}
	}, [layoutWidth, dispatch]);

	useEffect(() => {
		if (leftSideBarType) {
			dispatch(changeSidebarType(leftSideBarType));
		}
	}, [leftSideBarType, dispatch]);

	useEffect(() => {
		if (topbarTheme) {
			dispatch(changeTopbarTheme(topbarTheme));
		}
	}, [topbarTheme, dispatch]);

	/*
  call dark/light mode
  */
	const onChangeLayoutMode = (value) => {
		if (changelayoutMode) {
			dispatch(changelayoutMode(value, layoutType));
		}
	};

	return (
		<React.Fragment>
			<div className="pace pace-active" id="preloader">
				<div
					className="pace-progress"
					data-progress-text="100%"
					data-progress="99"
					style={{ transform: "translate3d(100%, 0px, 0px)" }}
				>
					<div className="pace-progress-inner"></div>
				</div>
				<div className="pace-activity"></div>
			</div>

			<div id="layout-wrapper">
				<Header
					toggleMenuCallback={toggleMenuCallback}
					onChangeLayoutMode={onChangeLayoutMode}
				/>

				<Sidebar
					theme={leftSideBarTheme}
					type={leftSideBarType}
					isMobile={isMobile}
				/>
				<div className="main-content">
					{props.children}
					<Footer />
				</div>
			</div>
			{showRightSidebar ? (
				<RightSidebar onChangeLayoutMode={onChangeLayoutMode} />
			) : (
				""
			)}
		</React.Fragment>
	);
};

Layout.propTypes = {
	changeLayoutWidth: PropTypes.func,
	changeSidebarTheme: PropTypes.func,
	changeSidebarType: PropTypes.func,
	changeTopbarTheme: PropTypes.func,
	children: PropTypes.any,
	isPreloader: PropTypes.any,
	layoutWidth: PropTypes.any,
	leftSideBarTheme: PropTypes.any,
	leftSideBarType: PropTypes.any,
	location: PropTypes.object,
	showRightSidebar: PropTypes.any,
	topbarTheme: PropTypes.any,
	changelayoutMode: PropTypes.func,
};

export default Layout;
