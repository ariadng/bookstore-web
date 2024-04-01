import ListingViewComponent from "@/components/ListingView/ListingView";
import ListingUtils from "@/utils/ListingUtils";

export default async function ListingViewPage(props: {
	params: {
		listingId: string;
	}
}) {

	const listing = await ListingUtils.get(props.params.listingId);

	if (!listing) return (
		<div>
			Listing tidak ditemukan.
		</div>
	);

	return (
		<div className="ScreenContent">
			<ListingViewComponent listing={listing} />
		</div>
	);
}