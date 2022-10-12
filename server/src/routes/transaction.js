import { Router } from "express"
import { getAllTransactions } from "../controllers/transactions.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllTransactions)

export default router
