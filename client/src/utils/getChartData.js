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

export function getTodayTransactions(transactions) {
	return transactions.filter((tran) =>
		moment(tran.createdAt).isSame(moment(), "day")
	)
}

export function getThisWeekTransactions(transactions) {
	return transactions.filter((tran) =>
		moment(tran.createdAt).isSame(moment(), "week")
	)
}

export function getThisMonthTransactions(transactions) {
	return transactions.filter((tran) =>
		moment(tran.createdAt).isSame(moment(), "months")
	)
}

export function getLastWeekTransactions(transactions) {
	return transactions.filter((tran) =>
		moment(tran.createdAt).isBetween(
			moment().subtract(1, "week").startOf("week"),
			moment().startOf("week")
		)
	)
}

export function getLastMonthTransactions(transactions) {
	return transactions.filter((tran) =>
		moment(tran.createdAt).isBetween(
			moment().subtract(1, "months").startOf("month"),
			moment().startOf("month")
		)
	)
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
