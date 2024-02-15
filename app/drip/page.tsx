import ClientOnly from '@/components/ClientOnly';
import Drip from '@/components/Drip';

export default function Page() {
	return (
		<ClientOnly>
			<Drip />
		</ClientOnly>
	);
}
