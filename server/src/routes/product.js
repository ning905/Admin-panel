import { Router } from "express"
import {
	createProduct,
	deleteProductById,
	getAllProductsForUser,
	getProductById,
	updateProductById,
} from "../controllers/product.js"
import { validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.get("/", validateAuthentication, getAllProductsForUser)
router.get("/:id", validateAuthentication, getProductById)

router.post("/", validateAuthentication, createProduct)
router.patch("/:id", validateAuthentication, updateProductById)

router.delete("/:id", validateAuthentication, deleteProductById)

export default router
