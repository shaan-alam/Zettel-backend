import express from 'express';
import { createNote, getAllNotesOfAUser, getAllNotesOfACollection } from '../controllers/note.controller'
import { validateRequest } from '../middlewares/validateRequest.middleware'
import { noteSchema } from '../schema/note.schema'
import verifyTokenFromHeaders from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.post('/create', verifyTokenFromHeaders, validateRequest(noteSchema), createNote);
router.get('/all', verifyTokenFromHeaders, getAllNotesOfAUser)
router.get('/collection/:collectionId', verifyTokenFromHeaders, getAllNotesOfACollection)

export default router;