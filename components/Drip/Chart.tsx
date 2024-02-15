import formatMoney from '@/utils/formatMoney';
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
} from 'recharts';
import styles from './drip.module.scss';
import { Year } from './types';

type Props = {
	data: Year[];
};

const CustomTooltip = ({
	active,
	payload,
}: TooltipProps<Year['end'], string>) => {
	if (active && payload && payload.length) {
		const point: Year = payload[0].payload;
		return (
			<div className="chart-tooltip">
				<div className="line">
					<div className="label">Year / Age</div>
					<div className="value">
						{point.year} / {point.age + 1}
					</div>
				</div>
				<div className="line">
					<div className="label">Balance</div>
					<div className="value">{formatMoney(point.end)}</div>
				</div>
				<div className="line">
					<div className="label">Salary</div>
					<div className="value">{formatMoney(point.salary)}/yr</div>
				</div>
			</div>
		);
	}

	return null;
};

const Chart = ({ data }: Props) => {
	return (
		<div className={styles.chart}>
			<ResponsiveContainer>
				<LineChart data={data}>
					<Line
						type="monotone"
						dataKey="end"
						stroke="#fff"
						strokeWidth={1}
					/>
					<XAxis
						dataKey="year"
						stroke="rgba(255, 255, 255, 0.3)"
						strokeDasharray="3 3"
					/>
					<Tooltip
						position={{ x: 0, y: 0 }}
						content={CustomTooltip}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
