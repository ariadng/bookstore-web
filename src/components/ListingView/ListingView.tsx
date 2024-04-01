"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import classNames from "classnames";
import styles from "./styles/style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/ui/Button";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { PriceUtils } from "@/utils/PriceUtils";
import { StringUtils } from "@/utils/StringUtils";
import { DateSelector, Icon } from "@/ui";
import { ListingViewTabs } from "./components";
import BookingOptions from "@/types/BookingOptions";
import { useSearchParams } from "next/navigation";
import BookingBox from "./components/BookingBox/component";
import ListingView from "@/types/ListingView";

export default function ListingViewComponent({
	listing,
}: {
	listing: ListingView;
}) {

	const searchParams = useSearchParams();

	const pageElement = useRef<HTMLDivElement>(null);
	const topSection = useRef<HTMLDivElement>(null);

	const [ isScrolledDown, setIsScrolledDown ] = useState<boolean>(false);

	const [ activeTab, setActiveTab ] = useState<string>("overview");
	const [ markers, setMarkers ] = useState<{[key: string]: number[]}>({});
	const [ topSectionHeight, setTopSectionHeight ] = useState<number[]>([0,0]);

	const [ options, setOptions ] = useState<BookingOptions>({});

	const handlePageScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
		if (pageElement.current) {
			const scrollAmount = event.currentTarget.scrollTop;

			// Top Section
			const photosElement = pageElement.current.querySelector(".Photos");
			const topSection = pageElement.current.querySelector(".TopSection");
			if (photosElement && topSection) {
				const { height } = photosElement.getBoundingClientRect();
				if (scrollAmount > (height + 80) && !isScrolledDown) {
					setIsScrolledDown(true);
				}
				else if (scrollAmount <= height && isScrolledDown) {
					setIsScrolledDown(false);
				}
			}

			// Content Sections
			for (let id of Object.keys(markers)) {
				const marker = markers[id];
				if (marker) {
					const inbound = (
						scrollAmount >= (marker[0] - 320) &&
						scrollAmount < (marker[1] - 320)
					);
					if (inbound) setActiveTab(id);
				}
			}

		};
	};

	const setupScrollSpy = useCallback(() => {
		if (pageElement.current && listing) {
			const sections = pageElement.current.querySelectorAll(".ContentSection");
			const markers: { [key: string]: number[] } = {};
			if (sections.length > 0) {
				for (let section of sections) {
					const id = section.getAttribute("data-id");
					if (id) markers[id] = [
						(section as HTMLDivElement).offsetTop,
						section.getBoundingClientRect().height + (section as HTMLDivElement).offsetTop,
					];
				}
			}
			setMarkers(markers);
		}
	}, [pageElement.current, listing]);

	const handleOnTabChange = (value: string) => {
		setActiveTab(value);
		if (pageElement.current && markers[value] && topSection.current) {
			pageElement.current.scrollTo({
				top: markers[value][0] - (value !== "overview" ? topSectionHeight[0] : topSectionHeight[0] + (Math.abs(topSectionHeight[0] - topSectionHeight[1]))),
				behavior: "smooth",
			});
		}
	};

	const updateOptions = () => {
		const newOptions: BookingOptions = {};
		newOptions.mode = searchParams.has("mode") ? searchParams.get("mode") : "nightly";
		newOptions.checkIn = searchParams.has("checkIn") ? searchParams.get("checkIn") : DateTimeUtils.getTodayString();
		newOptions.checkInTime = searchParams.has("checkInTime") ? searchParams.get("checkInTime") : DateTimeUtils.getNextHourString();
		newOptions.checkOut = searchParams.has("checkOut") ? searchParams.get("checkOut") : DateTimeUtils.getTomorrowString();
		setOptions(newOptions);
	};

	useEffect(() => {
		updateOptions();
	}, [searchParams]);

	useEffect(() => {
		setupScrollSpy();
	}, [pageElement.current, listing]);

	useEffect(() => {
		if (topSection.current) {
			if (topSectionHeight[0] === 0) {
				setTopSectionHeight([
					topSection.current.getBoundingClientRect().height,
					topSection.current.getBoundingClientRect().height,
				]);
			}
			else if (topSectionHeight[1] !== topSection.current.getBoundingClientRect().height) {
				setTopSectionHeight([
					topSectionHeight[0],
					topSection.current.getBoundingClientRect().height,
				]);
			}
		}
	}, [topSection.current, isScrolledDown]);

	return (
		<div
			ref={pageElement}
			className={classNames(styles.ListingView, {
				[styles.ScrolledDown]: isScrolledDown,
			})}
			onScroll={handlePageScroll}
		>

			<div className={styles.DesktopPhotos}>
				{listing.photos?.slice(0, 5).map(photo => (
					<button className={styles.Slide} key={photo.url}>
						<img className="Photo" src={photo.url} alt={listing.title ?? ""} loading="lazy" />
					</button>
				))}
			</div>

			<div className={classNames("Photos", styles.Photos)}>
				{listing && <>

					<Swiper
						className={classNames(styles.Swiper)}
						modules={[Pagination]}
						spaceBetween={0}
						slidesPerView={1}
						pagination
					>
						{listing.photos?.slice(0,5).map(photo => (
							<SwiperSlide className={styles.Slide} key={photo.url}>
								<img className="Photo" src={photo.url} alt={listing.title ?? ""} loading="lazy" />
							</SwiperSlide>
						))}
					</Swiper>

					<Button className={styles.BackButton} icon="arrow_back" color="light" size="small" href="/" />

				</>}
			</div>

			
			<div className={styles.ListingContent}>

			

				{listing && <>
					<div ref={topSection} className={classNames("TopSection", styles.TopSection)}>
						<div className={styles.TitleBar}>
							<div className={styles.Text}>
								<h1 className={styles.Title}>{listing.title}</h1>
								{/* <div className={styles.Info}>{listing.getDetails()}</div> */}
							</div>
						</div>
						<ListingViewTabs activeTab={activeTab} setActiveTab={handleOnTabChange} />
					</div>

					<BookingBox listing={listing} options={options} setOptions={(newVal: BookingOptions) => { setOptions({...options, ...newVal}) }} />

					<div data-id="overview" className={classNames("ContentSection", styles.ContentSection, styles.OverviewSection)}>
						<div className={styles.Badges}>

							<div className={styles.Badge}>
								<div className={styles.Value}>
									<Icon className={styles.Icon} name="bed" />
									<span className={styles.Text}>{listing.bedrooms}</span>
								</div>
								<div className={styles.Details}>Kamar Tidur</div>
							</div>
							<div className={styles.Badge}>
								<div className={styles.Value}>
									<Icon className={styles.Icon} name="group" />
									<span className={styles.Text}>{listing.maximumGuests}</span>
								</div>
								<div className={styles.Details}>Kapasitas</div>
							</div>
							<div className={styles.Badge}>
								<div className={styles.Value}>
									<Icon className={styles.Icon} name="square_foot" />
									<span className={styles.Text}>
										{listing.areaSize}<span className={styles.Unit}>m²</span>
									</span>
								</div>
								<div className={styles.Details}>Luas Area</div>
							</div>

						</div>

						<div className={styles.Description}>
							<h3>Tentang Properti</h3>
							<div className={styles.Content} dangerouslySetInnerHTML={{ __html: listing.description ?? "-" }}></div>
						</div>

					</div>

					<div data-id="gallery" className={classNames("ContentSection", styles.ContentSection, styles.GallerySection)}>
						<h3>Galeri Foto</h3>
						{listing.photos && listing.photos.length > 0 && <>
							<div className={styles.Gallery}>
								{listing.photos.map(photo => (
									<button key={photo.url}>
										<img src={photo.url} />
									</button>
								))}
							</div>
						</>}
					</div>

					<div data-id="facilities" className={classNames("ContentSection", styles.ContentSection, styles.FacilitiesSection)}>
						<h3>Fasilitas</h3>

						{listing.facilities && Object.keys(listing.facilities).length > 0 && <>

							<section>
								<h4>Kenyamanan</h4>
								<div className={styles.List}>

									{listing.facilities["kingBed"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="king_bed" />
											<span className={styles.Value}>{listing.facilities["kingBed"]} King Bed</span>
										</div>
									)}

									{listing.facilities["queenBed"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="bed" />
											<span className={styles.Value}>{listing.facilities["queenBed"]} Queen Bed</span>
										</div>
									)}

									{listing.facilities["singleBed"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="single_bed" />
											<span className={styles.Value}>{listing.facilities["singleBed"]} Single Bed</span>
										</div>
									)}

									{listing.facilities["bunkBed"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="shelves" />
											<span className={styles.Value}>{listing.facilities["bunkBed"]} Bunk Bed</span>
										</div>
									)}

									{listing.facilities["sofaBed"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="chair" />
											<span className={styles.Value}>{listing.facilities["sofaBed"]} Sofa Bed</span>
										</div>
									)}

									{listing.facilities["ac"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="ac_unit" />
											<span className={styles.Value}>AC</span>
										</div>
									)}

								</div>
							</section>

							<section>
								<h4>Kebersihan</h4>
								<div className={styles.List}>

									{listing.facilities["shower"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="shower" />
											<span className={styles.Value}>Shower</span>
										</div>
									)}

									{listing.facilities["waterHeater"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="water_heater" />
											<span className={styles.Value}>Air Panas</span>
										</div>
									)}

									{listing.facilities["bathtub"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="bathtub" />
											<span className={styles.Value}>Bathtub</span>
										</div>
									)}

									{listing.facilities["seatedToilet"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="airline_seat_recline_normal" />
											<span className={styles.Value}>Toilet Duduk</span>
										</div>
									)}

									{listing.facilities["towel"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="crop_portrait" />
											<span className={styles.Value}>Handuk</span>
										</div>
									)}

									{listing.facilities["soapShampoo"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="clean_hands" />
											<span className={styles.Value}>Sabun</span>
										</div>
									)}

								</div>
							</section>

							<section>
								<h4>Makan &amp; Memasak</h4>
								<div className={styles.List}>

									{listing.facilities["freeBreakfast"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="diner_dining" />
											<span className={styles.Value}>Sarapan Gratis</span>
										</div>
									)}

									{listing.facilities["freeDrinkingWater"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="water_full" />
											<span className={styles.Value}>Air Minum</span>
										</div>
									)}

									{listing.facilities["eatingUtensils"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="restaurant" />
											<span className={styles.Value}>Alat Makan</span>
										</div>
									)}

									{listing.facilities["stove"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="cooking" />
											<span className={styles.Value}>Kompor</span>
										</div>
									)}

									{listing.facilities["microwave"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="microwave" />
											<span className={styles.Value}>Microwave</span>
										</div>
									)}

									{listing.facilities["waterBoiler"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="kettle" />
											<span className={styles.Value}>Pemanas Air</span>
										</div>
									)}

									{listing.facilities["cookingUtensils"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="stockpot" />
											<span className={styles.Value}>Alat Masak</span>
										</div>
									)}

								</div>
							</section>

							<section>
								<h4>Bekerja &amp; Hiburan</h4>
								<div className={styles.List}>

									{listing.facilities["freeWifi"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="wifi" />
											<span className={styles.Value}>WiFi Gratis</span>
										</div>
									)}

									{listing.facilities["workingDesk"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="desk" />
											<span className={styles.Value}>Meja Kerja</span>
										</div>
									)}

									{listing.facilities["smartTv"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="connected_tv" />
											<span className={styles.Value}>Smart TV</span>
										</div>
									)}

									{listing.facilities["projector"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="cast" />
											<span className={styles.Value}>Proyektor</span>
										</div>
									)}

									{listing.facilities["whiteboard"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="ink_marker" />
											<span className={styles.Value}>Whiteboard</span>
										</div>
									)}

									{listing.facilities["printer"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="print" />
											<span className={styles.Value}>Printer</span>
										</div>
									)}

									{listing.facilities["scanner"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="scanner" />
											<span className={styles.Value}>Scanner</span>
										</div>
									)}

								</div>
							</section>

							<section>
								<h4>Fasilitas Lainnya</h4>
								<div className={styles.List}>

									{listing.facilities["freeParking"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="local_parking" />
											<span className={styles.Value}>Parkir Gratis</span>
										</div>
									)}

									{listing.facilities["swimmingPool"] && (
										<div className={styles.ListItem}>
											<Icon className={styles.Icon} name="pool" />
											<span className={styles.Value}>Kolam Renang</span>
										</div>
									)}

								</div>
							</section>

						</>}

					</div>

					<div data-id="location" className={classNames("ContentSection", styles.ContentSection, styles.LocationSection)}>
						<h3>Lokasi</h3>
						{/* <PropertyLocationMap className={styles.Map} initialCoordinate={listing.coordinate ?? undefined} /> */}
						<address>
							{listing.generatedAddress}
						</address>
					</div>

					<div data-id="policy" className={classNames("ContentSection", styles.ContentSection, styles.PolicySection)}>
						<h3>Kebijakan Properti</h3>
						<div className={styles.PolicyHighlight}>
							{listing.petFriendly && (
								<div className={styles.Item}>
									<Icon className={styles.Icon} name="pets" />
									<span className={styles.Text}>Boleh membawa hewan peliharaan</span>
								</div>
							)}
							{!listing.petFriendly && (
								<div className={styles.Item}>
									<Icon className={styles.Icon} name="block" />
									<span className={styles.Text}>Dilarang membawa hewan peliharaan</span>
								</div>
							)}
							{listing.smokingAllowed && (
								<div className={styles.Item}>
									<Icon className={styles.Icon} name="smoking_rooms" />
									<span className={styles.Text}>Boleh merokok</span>
								</div>
							)}
							{!listing.smokingAllowed && (
								<div className={styles.Item}>
									<Icon className={styles.Icon} name="smoke_free" />
									<span className={styles.Text}>Dilarang merokok</span>
								</div>
							)}
							{listing.maxCheckInTime && (
								<div className={styles.Item}>
									<Icon className={styles.Icon} name="schedule" />
									<span className={styles.Text}>Maksimal check-in pukul {listing.maxCheckInTime}</span>
								</div>
							)}
						</div>

						<div className={styles.Procedures}>
							{listing.checkInInstructions && (
								<section>
									<h4>Prosedur Check-in</h4>
									<div className={styles.Text}>
										{listing.checkInInstructions}
									</div>
								</section>
							)}
							{listing.checkOutInstructions && (
								<section>
									<h4>Prosedur Check-out</h4>
									<div className={styles.Text}>
										{listing.checkOutInstructions}
									</div>
								</section>
							)}
							{listing.additionalInfo && (
								<section>
									<h4>Catatan Tambahan</h4>
									<div className={styles.Text}>
										{listing.additionalInfo}
									</div>
								</section>
							)}
						</div>

					</div>

					<div data-id="pricing" className={classNames("ContentSection", styles.ContentSection, styles.PricingSection)}>
						<h3>Harga</h3>
						<div className={styles.ListingOptions}>
							{/* <div className={styles.Row}>
								<div className={styles.Label}>Mode Pemesanan</div>
								<div className={styles.Value}>{StringUtils.formatMode(options.mode)}</div>
							</div> */}
							<div className={styles.Row}>
								<div className={styles.Label}>Check-in</div>
								<div className={styles.Value}>{StringUtils.formatDateLong(options.checkIn)}</div>
							</div>
							<div className={styles.Row}>
								<div className={styles.Label}>Check-out</div>
								<div className={styles.Value}>{StringUtils.formatDateLong(options.checkOut)}</div>
							</div>
							<div className={styles.Row}>
								<div className={styles.Label}>Durasi</div>
								<div className={styles.Value}>{DateTimeUtils.getDaysBetween(options.checkIn!, options.checkOut!)} malam</div>
							</div>
						</div>
						<div className={styles.ListingPrice}>
							<div className={styles.Row}>
								<div className={styles.Label}>Harga rata-rata</div>
								<div className={styles.Value}>
									{PriceUtils.formatPrice(listing.rate.nightly)}
									<span> / malam</span>
								</div>
							</div>
							<div className={styles.Row}>
								<div className={styles.Label}>Total</div>
								<div className={styles.Value}>
									{PriceUtils.formatPrice(listing.rate.nightly * DateTimeUtils.getDaysBetween(options.checkIn!, options.checkOut!))}
								</div>
							</div>
						</div>
					</div>

					<div className={classNames(styles.ContentSection, styles.ReserveSection)}>
						<div className={styles.Actions}>
							<Button icon="calendar_today" />
							<Button label="Pesan" color="primary" className={styles.Book} />
						</div>
						<div className={styles.Text}>
							{/* {options.checkIn && options.checkOut && <>
								<p>
									{DateTimeUtils.reduceDateRanges([options.checkIn, options.checkOut])}
									&nbsp; @ &nbsp;
									<strong>
										{PriceUtils.formatPrice(listing.getPriceBreakdown(options).average)}
										<span> / malam</span>
									</strong>
								</p>
							</>} */}
						</div>
					</div>

				</>}

			</div>

		</div>
	);

}