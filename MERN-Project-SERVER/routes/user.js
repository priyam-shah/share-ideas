import express from "express";

const router = express.Router();

import { signin, signup } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);

// post because we have to send all details from form to back-end

export default router;
