'use client';

import formatMoney from '@/utils/formatMoney';
import { useLocalStorage } from '@uidotdev/usehooks';
import kebabCase from 'lodash/kebabCase';
import { FormEventHandler, useMemo } from 'react';
import Chart from './Chart';
import styles from './drip.module.scss';
import { Year } from './types';

const key = (name: string) => kebabCase(`drip_${name}`);

export default function Drip() {
	// States
	const [age, setAge] = useLocalStorage(key('age'), 25);
	const [initial, setInitial] = useLocalStorage(key('initial'), 5_000);
	const [contributions, setContributions] = useLocalStorage(key('dc'), 5);
	const [increase, setIncrease] = useLocalStorage(key('api'), 16);
	const [divYield, setDivYield] = useLocalStorage(key('ady'), 0.7);
	const [divGrowth, setDivGrowth] = useLocalStorage(key('adg'), 0);
	const [tax, setTax] = useLocalStorage(key('taxRate'), 15);
	const [years, setYears] = useLocalStorage(key('years'), 65 - age);

	// Aggregate date for chart + table
	const data = useMemo(() => {
		const final: Year[] = [];
		for (let i = 0; i < years; i++) {
			const previous = final[i - 1];
			const current: Partial<Year> = {};

			current.year = i + 1;
			current.age = previous?.age ? previous.age + 1 : age;
			current.start = previous?.end || initial;
			current.contributions = contributions * 252;
			current.growth = current.start * (increase / 100);
			current.growthCumulative = previous?.growth
				? previous.growth + current.growth
				: current.growth;
			current.divYield = previous?.divYield
				? previous.divYield * (1 + divGrowth / 100)
				: divYield;
			current.grossDiv = current.start * (current.divYield / 100);
			current.netDiv = current.grossDiv * (1 - tax / 100);
			current.end =
				current.start +
				current.contributions +
				current.growth +
				current.netDiv;
			current.salary =
				(current.end - current.growthCumulative * 0.15) * 0.1;

			final.push(current as Year);
		}
		return final;
	}, [
		initial,
		age,
		contributions,
		increase,
		divYield,
		divGrowth,
		tax,
		years,
	]);

	// Handlers
	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
	};

	// Render
	return (
		<div className={styles.container}>
			{/* Form */}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="label">Age</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={age}
							onChange={(e) =>
								setAge(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) => (e.target.value = age.toString())}
							autoFocus
						/>
					</div>
				</div>
				<div className="row">
					<div className="label">Initial Balance</div>
					<div className="separator"></div>
					<div className="value">
						<span className="meta">$</span>
						<input
							type="text"
							defaultValue={initial}
							onChange={(e) =>
								setInitial(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) =>
								(e.target.value = initial.toString())
							}
						/>
					</div>
				</div>
				<div className="row">
					<div className="label">Daily Contributions</div>
					<div className="separator"></div>
					<div className="value">
						<span className="meta">$</span>
						<input
							type="text"
							defaultValue={contributions}
							onChange={(e) =>
								setContributions(
									parseFloat(e.target.value) || 0
								)
							}
							onBlur={(e) =>
								(e.target.value = contributions.toString())
							}
						/>
						<span className="meta">/ day</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Increase of Stock Price</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={increase}
							onChange={(e) =>
								setIncrease(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) =>
								(e.target.value = increase.toString())
							}
						/>
						<span className="meta">% / yr</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Dividend Yield</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={divYield}
							onChange={(e) =>
								setDivYield(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) =>
								(e.target.value = divYield.toString())
							}
						/>
						<span className="meta">% / yr</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Annual Dividend Growth</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={divGrowth}
							onChange={(e) =>
								setDivGrowth(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) =>
								(e.target.value = divGrowth.toString())
							}
						/>
						<span className="meta">% / yr</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Tax Rate</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={tax}
							onChange={(e) =>
								setTax(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) => (e.target.value = tax.toString())}
						/>
						<span className="meta">% / yr</span>
					</div>
				</div>
				<div className="row">
					<div className="label">Years in the Future</div>
					<div className="separator"></div>
					<div className="value">
						<input
							type="text"
							defaultValue={years}
							onChange={(e) =>
								setYears(parseFloat(e.target.value) || 0)
							}
							onBlur={(e) => (e.target.value = years.toString())}
						/>
						<span className="meta">years</span>
					</div>
				</div>
			</form>

			{/* Chart */}
			<Chart data={data} />

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
							<th>Salary</th>
							<th>Age</th>
						</tr>
					</thead>
					{data?.length > 0 && (
						<tbody>
							{data.map((d, i) => (
								<tr key={i}>
									<td>{d.year}</td>
									<td>{formatMoney(d.start)}</td>
									<td>{formatMoney(d.contributions)}</td>
									<td>{formatMoney(d.growth)}</td>
									<td>{formatMoney(d.grossDiv)}</td>
									<td>{formatMoney(d.netDiv)}</td>
									<td>{formatMoney(d.end)}</td>
									<td>{formatMoney(d.salary)}/yr</td>
									<td>{d.age + 1}</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}
