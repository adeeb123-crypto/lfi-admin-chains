const stringToBoolean = (stringData) =>
	stringData === "false" ||
	stringData === "null" ||
	stringData === "0" ||
	stringData === false ||
	stringData === null ||
	stringData === 0
		? false
		: !!stringData;

module.exports = stringToBoolean;
