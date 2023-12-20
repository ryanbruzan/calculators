const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
});

const formatMoney = (input: number) => {
	return formatter.format(input);
};

export default formatMoney;
