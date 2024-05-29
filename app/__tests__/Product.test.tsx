import { formatNumberWithDots, roundNumber } from "@/utils/utils";

describe("formatNumberWithDots", () => {
	it("should format numbers with dots correctly", () => {
		expect(formatNumberWithDots(1000)).toBe("1.000");
		expect(formatNumberWithDots(1234567)).toBe("1.234.567");
		expect(formatNumberWithDots("9876543210")).toBe("9.876.543.210");
	});
});

describe("roundNumber", () => {
	it("should round numbers correctly", () => {
		expect(roundNumber("1456.77")).toBe(1457);
		expect(roundNumber("1234.56")).toBe(1235);
		expect(roundNumber("567.89")).toBe(568);
	});

	it("should throw an error for invalid input", () => {
		expect(() => roundNumber("invalid")).toThrow(
			"Invalid input: The value is not a number."
		);
	});
});
