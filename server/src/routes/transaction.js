import { Router } from "express"
import {
	createTransaction,
	getAllTransactionsForUser,
} from "../controllers/transactions.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllTransactionsForUser)

router.post("/", createTransaction)

export default router
