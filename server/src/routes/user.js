import { Router } from "express"
import {
	getAllUsers,
	getUserByUsername,
	login,
	signUp,
} from "../controllers/user.js"
import { validateAdmin, validateAuthentication } from "../middleware/auth.js"

const router = Router()

router.post("/login", login)
router.post("/signup", signUp)

router.get("/", validateAuthentication, validateAdmin, getAllUsers)
router.get("/:username", validateAuthentication, getUserByUsername)

export default router
