import { Router } from "express"
import { sendMessageResponse } from "../utils/serverResponse.js"

const router = Router()

router.get("/", (req, res) => sendMessageResponse(res, 200, "OK"))

export default router
