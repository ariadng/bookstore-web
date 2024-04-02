"use client";

import ListingGrid from "@/components/ListingGrid/ListingGrid";
import { useSearchParams } from "next/navigation";

export function HomeBookList() {

	const searchParams = useSearchParams();

	return (
		<ListingGrid countPerPage={8} searchParams={searchParams.has("query") ? { query: searchParams.get("query") as any } : undefined} />
	)

}