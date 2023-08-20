import express from 'express';
import { createNote, getAllNotesOfAUser, getAllNotesOfACollection, saveNote, getNote, deleteNote } from '../controllers/note.controller'
import { validateRequest } from '../middlewares/validateRequest.middleware'
import { noteSchema } from '../schema/note.schema'
import verifyTokenFromHeaders from '../middlewares/verifyToken.middleware';

const router = express.Router();

router.post('/create', verifyTokenFromHeaders, validateRequest(noteSchema), createNote);
router.get('/all', verifyTokenFromHeaders, getAllNotesOfAUser)
router.get('/collection/:collectionId', verifyTokenFromHeaders, getAllNotesOfACollection)
router.patch('/save', verifyTokenFromHeaders, saveNote);
router.get('/:noteId', verifyTokenFromHeaders, getNote)
router.delete('/delete/:noteId', verifyTokenFromHeaders, deleteNote)

export default router;