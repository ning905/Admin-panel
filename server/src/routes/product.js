import { Router } from "express"
import { getAllProductsForUser } from "../controllers/product.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllProductsForUser)

export default router
