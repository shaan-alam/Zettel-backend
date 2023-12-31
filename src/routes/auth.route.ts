import express from "express";
import { signUp, signIn, oAuthLogin } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import {
  authSignUpSchema,
  authSignInSchema,
  oAuthSchema,
} from "../schema/auth.schema";
import { getUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", validateRequest(authSignUpSchema), getUser, signUp);
router.post("/signIn", validateRequest(authSignInSchema), getUser, signIn);
router.get("/test", (req: express.Request, res: express.Response) => {
  res.send({ test: "message received" });
});
router.post("/oauth", validateRequest(oAuthSchema), getUser, oAuthLogin);

export default router;
