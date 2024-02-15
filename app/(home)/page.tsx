import Header from '@/components/Header';
import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
			<Header />
			<p className="subtle">
				Navigate to a calculator using the tabs above.
			</p>
		</div>
	);
}
