import { Year } from '@/components/Drip/types';
import DripChartTooltip from '@/components/DripChartTooltip';
import {
	Area,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from 'recharts';
import styles from './drip-chart.module.scss';

type Props = {
	data: Year[];
};

const DripChart = ({ data }: Props) => {
	return (
		<div className={styles.chart}>
			<ResponsiveContainer>
				<ComposedChart data={data}>
					<Area
						type="monotone"
						dataKey="end"
						stroke="#fff"
						strokeWidth={1}
						animationDuration={400}
						fill="url(#gradient)"
					/>

					<Line
						type="monotone"
						dataKey="end"
						stroke="#fff"
						strokeWidth={1}
						animationDuration={400}
					/>

					<XAxis
						dataKey="year"
						stroke="rgba(255, 255, 255, 0.3)"
						strokeDasharray="3 3"
					/>

					<Tooltip
						cursor={{ stroke: '#fff' }}
						position={{ x: 0, y: 0 }}
						content={DripChartTooltip}
					/>

					<defs>
						<linearGradient
							id="gradient"
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor="#fff"
								stopOpacity={0.2}
							/>
							<stop
								offset="100%"
								stopColor="#fff"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
};

export default DripChart;
