'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header.module.scss';

type Props = {};

const Header = ({}: Props) => {
	const pathname = usePathname();

	return (
		<div className={styles.header}>
			<Link
				href="/drip"
				className={clsx(styles.link, {
					[styles.active]: pathname === '/drip',
				})}
			>
				DRIP
			</Link>
		</div>
	);
};

export default Header;
