const moneyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

const toMoney = (input: number) => {
	return moneyFormatter.format(input);
};

export default toMoney;
