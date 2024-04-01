export default interface ListingView {
	id: string;
	title: string;
	category: string;
	location: {
		lat: number;
		lng: number;
		masked: boolean;
		short: string;
	};
	thumbnails: string[];
	rate: {
		nightly: number;
		hourly3: number | null;
	};

	photos?: {
		url: string;
		description?: string;
	}[];

	bedrooms?: number;
	maximumGuests?: number;
	areaSize?: number;
	
	description?: string;
	facilities?: {[key: string]: number | boolean};
	
	petFriendly?: boolean;
	smokingAllowed?: boolean;
	maxCheckInTime?: string;
	checkInInstructions?: string;
	checkOutInstructions?: string;
	additionalInfo?: string;


	generatedAddress?: string;
}