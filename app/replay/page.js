import styles from './page.module.css';
import Replays from './replays';

export default function Page() {
	return (
		<>
			<div className={styles.main}>
				<div className={styles.label}>
					<h2>전체 Replay</h2>
				</div>
				<Replays />
			</div>
		</>
	);
}
