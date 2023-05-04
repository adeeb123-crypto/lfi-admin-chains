export default (functionToCheck) =>
	functionToCheck &&
	{}.toString.call(functionToCheck) === "[object Function]";
