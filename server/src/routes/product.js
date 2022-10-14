import { Router } from "express"
import {
	deleteProductById,
	getAllProductsForUser,
} from "../controllers/product.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllProductsForUser)

router.delete("/:id", validateAuthentication, deleteProductById)

export default router
