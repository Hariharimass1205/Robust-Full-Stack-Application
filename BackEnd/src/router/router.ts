import { Router } from "express";
import { getData, getReviews } from "../controllers/data";
const router: Router = Router()

router.post("/",getData)
router.get("/getData",getReviews)

export default router