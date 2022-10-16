import { Router } from "express"
import {
	createProduct,
	deleteProductById,
	getAllProductsForUser,
} from "../controllers/product.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllProductsForUser)

router.post("/", validateAuthentication, createProduct)

router.delete("/:id", validateAuthentication, deleteProductById)

export default router
