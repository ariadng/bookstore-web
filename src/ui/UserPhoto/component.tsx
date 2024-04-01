import styles from "./styles/style.module.scss";

export function UserPhoto(props: {
	src?: string | null;
}) {

	if (props.src) return (
		<span className={styles.UserPhoto}>
			<img src={props.src} alt="Foto" />
		</span>
	);

	return (
		<>Tidak ada foto</>
	);

}