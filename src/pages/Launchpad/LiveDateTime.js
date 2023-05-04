import React, { useState, useEffect } from "react";
import moment from "moment";

export const LiveDateTime = () => {
	const [date, setDate] = useState(moment.utc());
	useEffect(() => {
		var timer = setInterval(() => setDate(moment.utc()), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	return <>{`${date.format("YYYY-MM-DD HH:mm:ss")}`}</>;
};
export default LiveDateTime;
