import ListingBook from "@/components/ListingBook/ListingBook";
import BookingOptions from "@/types/BookingOptions";

export default function ListingBookPage(props: {
	params: {
		listingId: string;
	},
	searchParams: BookingOptions;
}) {

	if (!props.params.listingId || !props.searchParams) return (
		<div>
			Maaf, terjadi kesalahan.
		</div>
	);

	return (
		<ListingBook listingId={props.params.listingId} bookingOptions={props.searchParams} />
	);
}