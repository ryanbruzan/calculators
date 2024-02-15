import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Year } from './types';

type Props = {
	data: Year[];
};

const Chart = ({ data }: Props) => {
	return (
		<div style={{ width: '100%', aspectRatio: 16 / 9, maxHeight: 300 }}>
			<ResponsiveContainer>
				<LineChart data={data}>
					<Line
						type="monotone"
						dataKey="end"
						stroke="#fff"
					/>
					<XAxis dataKey="year" />
					<YAxis />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
