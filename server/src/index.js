import "dotenv/config"
import express from "express"
import "express-async-errors"
import cors from "cors"
import { sendDataResponse } from "./utils/serverResponse.js"
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import transactionRouter from "./routes/transaction.js"
import deployRouter from "./routes/deploy.js"

const app = express()
app.disable("x-powered-by")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", deployRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/transactions", transactionRouter)

app.use((error, req, res, next) => {
	console.error(error)

	if (error.code === "P2025") {
		return sendDataResponse(res, 404, "Record does not exist")
	}

	return sendDataResponse(res, 500)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`\n Server is running on port ${port}\n`)
})
