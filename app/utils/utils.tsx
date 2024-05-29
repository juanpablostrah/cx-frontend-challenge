export const formatNumberWithDots = (number: number | string) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const roundNumber = (value: string) => {
	const number = parseFloat(value);
	if (isNaN(number)) {
		throw new Error("Invalid input: The value is not a number.");
	}
	return Math.round(number);
};
