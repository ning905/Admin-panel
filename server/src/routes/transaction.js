import { Router } from "express"
import { getAllTransactionsForUser } from "../controllers/transactions.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllTransactionsForUser)

export default router
