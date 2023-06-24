import { Response } from 'express';
import { TypedRequestBody  } from '../types'
import Note from '../models/Note.model';

interface NoteType {
  title: string;
  body: string
}

export const createNote = async (req: TypedRequestBody<NoteType>, res: Response<any, { userId: string}>) => {
  try {
    const { title, body } = req.body

    const newNote = await new Note({ title, body, createdBy: res.locals.userId });
    const newNoteDoc = await newNote.save();

    return res.status(201).json({ newNote: newNoteDoc  });
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
}
