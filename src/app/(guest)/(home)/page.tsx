import ListingGrid from "@/components/ListingGrid/ListingGrid";

export default async function Home(props: {
	searchParams: {[key: string]: string};
}) {

	return (
		<div className="h-full overflow-hidden">
			<ListingGrid searchParams={props.searchParams.query ? props.searchParams : undefined} countPerPage={8} />
		</div>
	);
}