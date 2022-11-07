import moment from "moment"

function getMonth(time) {
	return time.format("MMMM")
}

function getRevenue(price, transactions) {
	return transactions.reduce((pre, current) => pre + current.amount * price, 0)
}

export function getProductRevenueData(product, months = 6) {
	const data = []
	for (let i = 0; i < months; i++) {
		const time = moment().subtract(i, "months")
		const month = getMonth(time)
		const mTransactions = product.transactions.filter(
			(tran) =>
				moment(tran.createdAt) < time.endOf("month") &&
				moment(tran.createdAt) > time.startOf("month") &&
				tran.status !== "CANCELLED"
		)
		const total = getRevenue(Number(product.price), mTransactions)
		data.unshift({ name: month, Total: total })
	}
	return data
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
