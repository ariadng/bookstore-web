import ListingGrid from "@/components/ListingGrid/ListingGrid";
import ListingUtils from "@/utils/ListingUtils";

export default async function Home(props: {
	searchParams: {[key: string]: string};
}) {

	const listings = Object.keys(props.searchParams).length > 0 ?
		await ListingUtils.search(props.searchParams)
		: await ListingUtils.index();

	return (
		<div style={{
			paddingLeft: 20,
			paddingRight: 20,
			paddingBottom: 20,
			paddingTop: 20,
		}}>
			<div>
				<ListingGrid data={listings} />
			</div>
		</div>
	);
}