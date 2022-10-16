import { Router } from "express"
import {
	createUser,
	deleteUserById,
	getAllUsers,
	getUserByUsername,
	login,
	signUp,
} from "../controllers/user.js"
import { validateAdmin, validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.post("/login", login)
router.post("/signup", signUp)
router.post("/", validateAuthentication, validateAdmin, createUser)

router.get("/", validateAuthentication, validateAdmin, getAllUsers)
router.get("/:username", validateAuthentication, getUserByUsername)

router.delete("/:id", validateAuthentication, validateAdmin, deleteUserById)

export default router
