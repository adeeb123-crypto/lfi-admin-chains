const addressType = {
	USDTBSC: "BSC",
	TUSDT: "TRX20",
	EUSDT: "ERC20",
	USDT: "Omni",
};

export default (userAddresses) => {
	const formatAddressType = [];
	if (userAddresses) {
		Object.entries(userAddresses).forEach(([key, value]) => {
			if (addressType[key])
				formatAddressType.push({
					addressType: addressType[key],
					addressMainType: key,
					address: value,
				});
		});
	}
	return formatAddressType;
};
