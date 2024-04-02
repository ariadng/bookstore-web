import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { ReactNode, Suspense } from "react";

export default function SiteLayout (props: {
	children: ReactNode;
}) {
	return (
		<div className="Screen">
			<Suspense>
				<SiteHeader />
			</Suspense>
			<div className="ScreenContent">
				<div className="ScreenContent">
					{props.children}
				</div>
			</div>
		</div>
	);
}