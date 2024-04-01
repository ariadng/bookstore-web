import SiteHeader from "@/components/SiteHeader/SiteHeader";
import { ReactNode } from "react";

export default function SiteLayout (props: {
	children: ReactNode;
}) {
	return (
		<div className="Screen">
			<SiteHeader />
			<div className="ScreenContent">
				<div className="ScreenContent">
					{props.children}
				</div>
				{/* <footer style={{
					padding: 20,
				}}>
					Footer
				</footer> */}
			</div>
		</div>
	);
}