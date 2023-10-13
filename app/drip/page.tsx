'use client';

import toMoney from '@/utils/toMoney';
import { FormEventHandler, useMemo, useState } from 'react';
import styles from './page.module.scss';

type Year = {
	year: number;
	start: number;
	contribution: number;
	growth: number;
	grossDividends: number;
	netDividends: number;
	end: number;
};

export default function Drip() {
	const [initial, setInitial] = useState(40_000);
	const [annualContributions, setAnnualContributions] = useState(37_800);
	const [annualPriceIncrease, setAnnualPriceIncrease] = useState(16);
	const [annualDividendYield, setAnnualDividendYield] = useState(0.69);
	const [annualDividendGrowth, setAnnualDividendGrowth] = useState(0);
	const [taxRate, setTaxRate] = useState(15);
	const [years, setYears] = useState(20);

	const data = useMemo(() => {
		const final: Year[] = [];
		for (let i = 0; i < years; i++) {
			const previous = final[i - 1];
			const current: Partial<Year> = {};

			current.year = i + 1;
			current.start = previous?.end || initial;
			current.contribution = annualContributions;
			current.growth = current.start * (annualPriceIncrease / 100);
			current.grossDividends =
				current.start * (annualDividendYield / 100);
			current.netDividends = current.grossDividends * (1 - taxRate / 100);
			current.end =
				current.start +
				current.contribution +
				current.growth +
				current.netDividends;

			final.push(current as Year);
		}
		return final;
	}, [
		initial,
		annualContributions,
		annualPriceIncrease,
		annualDividendYield,
		annualDividendGrowth,
		taxRate,
		years,
	]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
	};

	return (
		<div className={styles.page}>
			{/* Form */}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="label">Initial Balance</div>
					<div className="separator"></div>
					<div className="value">
						<span className="meta">$</span>
						<input
							type="text"
							value={initial}
							onChange={(e) =>
								setInitial(parseFloat(e.target.value) || 0)
							}
							autoFocus
						/>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Contributions</div>
					<div className="separator"></div>
					<div className="value">
						<span className="meta">$</span>
						<input
							type="text"
							value={annualContributions}
							onChange={(e) =>
								setAnnualContributions(
									parseFloat(e.target.value) || 0
								)
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Increase of Stock Price</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							value={annualPriceIncrease}
							onChange={(e) =>
								setAnnualPriceIncrease(
									parseFloat(e.target.value) || 0
								)
							}
						/>
						<span className="meta">%</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Dividend Yield</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							value={annualDividendYield}
							onChange={(e) =>
								setAnnualDividendYield(
									parseFloat(e.target.value) || 0
								)
							}
						/>
						<span className="meta">%</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Dividend Growth</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							value={annualDividendGrowth}
							onChange={(e) =>
								setAnnualDividendGrowth(
									parseFloat(e.target.value) || 0
								)
							}
						/>
						<span className="meta">%</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Tax Rate</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							value={taxRate}
							onChange={(e) =>
								setTaxRate(parseFloat(e.target.value) || 0)
							}
						/>
						<span className="meta">%</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Years in the Future</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							value={years}
							onChange={(e) =>
								setYears(parseFloat(e.target.value) || 0)
							}
						/>
					</div>
				</div>
			</form>

			{/* Table data */}
			<div className="table-scroller">
				<table>
					<thead>
						<tr>
							<th>Year</th>
							<th>Start</th>
							<th>Cont.</th>
							<th>Growth</th>
							<th>Gross Div.</th>
							<th>Net Div.</th>
							<th>End</th>
						</tr>
					</thead>
					{data?.length > 0 && (
						<tbody>
							{data.map((d) => (
								<tr>
									<td>{d.year}</td>
									<td>{toMoney(d.start)}</td>
									<td>{toMoney(d.contribution)}</td>
									<td>{toMoney(d.growth)}</td>
									<td>{toMoney(d.grossDividends)}</td>
									<td>{toMoney(d.netDividends)}</td>
									<td>{toMoney(d.end)}</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}
