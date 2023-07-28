import express from 'express';
import { signUp } from '../controllers/auth.controller';
import { signIn } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest.middleware';
import { authSignUpSchema, authSignInSchema } from '../schema/auth.schema';
import { getUser } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', validateRequest(authSignUpSchema), getUser, signUp)
router.post('/signIn', validateRequest(authSignInSchema), getUser, signIn)
router.post('/test', (req: express.Request, res: express.Response) => {
  res.send({ test: 'message received'})
})

export default router;