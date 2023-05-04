import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import {
	Button,
	Col,
	Alert,
	Container,
	Form,
	Input,
	FormFeedback,
	Label,
} from "reactstrap";

const Test = () => {
	const [timeLeft, setTimeLeft] = useState(null);

	useEffect(() => {
		if (timeLeft === 0) {
			setTimeLeft(null);
		}

		// exit early when we reach 0
		if (!timeLeft) return;

		// save intervalId to clear the interval when the
		// component re-renders
		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		// clear interval on re-render to avoid memory leaks
		return () => clearInterval(intervalId);
		// add timeLeft as a dependency to re-rerun the effect
		// when we update it
	}, [timeLeft]);

	return (
		<React.Fragment>
			{timeLeft}
			<Button onClick={() => setTimeLeft(89)} className={"btn btn-sm"}>
				TEST
			</Button>
		</React.Fragment>
	);
};
export default Test;
