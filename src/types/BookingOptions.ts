export default interface BookingOptions {
	mode?: string | null;
	checkIn?: null | string;
	checkOut?: null | string;
	checkInTime?: null | string;
	checkOutTime?: null | string;
	guests?: null | number;
}