import { Year } from '@/components/Drip/types';
import formatMoney from '@/utils/formatMoney';
import { TooltipProps } from 'recharts';

const DripChartTooltip = ({
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

export default DripChartTooltip;
