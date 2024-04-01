import { useLayoutEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./styles/style.module.scss";

const TABS = [
	{ key: "overview", label: "Ringkasan" },
	{ key: "gallery", label: "Galeri" },
	{ key: "facilities", label: "Fasilitas" },
	{ key: "location", label: "Lokasi" },
	{ key: "policy", label: "Kebijakan" },
	{ key: "pricing", label: "Harga" },
]

export function ListingViewTabs(props: {
	activeTab: string;
	setActiveTab: Function;
}) {

	const tabsContainer = useRef<HTMLDivElement>(null);
	const currentTab = useRef<string>(props.activeTab);

	const scrollTabsContainer = () => {
		if (tabsContainer.current) {
			const { width } = tabsContainer.current.getBoundingClientRect();
			const scrollAmount = tabsContainer.current.scrollLeft;
			const viewportMin = scrollAmount;
			const viewportMax = width + scrollAmount;
			const targetTab = tabsContainer.current.querySelector(`#tab-${props.activeTab}`) as HTMLButtonElement;
			if (targetTab) {
				const tabWidth = targetTab.getBoundingClientRect().width;
				const startX = targetTab.offsetLeft;
				const endX = startX + tabWidth;
				const outOfBounds = (
					startX >= viewportMax ||
					startX < viewportMin ||
					endX >= viewportMax - 40 ||
					endX < viewportMin
				);
				if (outOfBounds) {
					let amount = startX;
					if (startX < (scrollAmount + (width / 2))) amount = amount - 40;
					tabsContainer.current.scrollTo({
						left: amount,
						behavior: "smooth",
					});
				}
			}
		}
	};

	useLayoutEffect(() => {
		if (props.activeTab !== currentTab.current) {
			currentTab.current = props.activeTab;
			scrollTabsContainer();
		}
	}, [props.activeTab]);
	
	return (
		<div className={classNames(styles.ListingViewTabs)}>

			<div ref={tabsContainer} className={classNames(styles.Tabs)}>
				{TABS.map(tab => (
					<button
						key={tab.key}
						id={`tab-${tab.key}`}
						className={classNames({
							[styles.Active]: props.activeTab === tab.key,
						})}
						onClick={() => props.setActiveTab(tab.key)}
					>
						{tab.label}
					</button>
				))}
			</div>

		</div>
	);

}