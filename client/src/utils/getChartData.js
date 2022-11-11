import moment from "moment"

function getMonth(time) {
	return time.format("MMMM")
}

export function getRevenue(transactions) {
	return transactions.reduce(
		(pre, current) => pre + current.amount * Number(current.product.price),
		0
	)
}

export function getProductRevenueData(transactions, months = 6) {
	const data = []
	for (let i = 0; i < months; i++) {
		const time = moment().subtract(i, "months")
		const month = getMonth(time)
		const mTransactions = transactions.filter(
			(tran) =>
				moment(tran.createdAt) < time.endOf("month") &&
				moment(tran.createdAt) > time.startOf("month") &&
				tran.status !== "CANCELLED"
		)
		const total = getRevenue(mTransactions)
		data.unshift({ name: month, Total: total })
	}
	return data
}

export function getThisPeriodItems(period, items) {
	return items.filter(
		(item) =>
			moment(item.createdAt).isSame(moment(), period) &&
			item.status !== "CANCELLED"
	)
}

export function getLastPeriodItems(period, items) {
	return items.filter(
		(item) =>
			moment(item.createdAt).isBetween(
				moment().subtract(1, period).startOf(period),
				moment().startOf(period)
			) && item.status !== "CANCELLED"
	)
}

export function getDataDiff(current, previous) {
	let diff = (current / previous - 1) * 100

	if (previous === 0) {
		diff = (current - 1) * 100
	}

	if (diff % 1) {
		diff = diff.toFixed(1)
	}

	return diff
}

function getEarning(transactions) {
	return transactions.reduce(
		(pre, current) => pre + current.amount * current.product.price,
		0
	)
}

export function getUserEarningData(transactions, months = 6) {
	const data = []
	for (let i = 0; i < months; i++) {
		const time = moment().subtract(i, "months")
		const month = getMonth(time)
		const mTransactions = transactions.filter(
			(tran) =>
				moment(tran.createdAt) < time.endOf("month") &&
				moment(tran.createdAt) > time.startOf("month") &&
				tran.status !== "CANCELLED"
		)
		const total = getEarning(mTransactions)
		data.unshift({ name: month, Total: total })
	}
	return data
}
