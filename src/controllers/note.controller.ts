import { Request, Response } from 'express';
import { TypedRequestBody  } from '../@types'
import Note from '../models/Note.model';
import Collection from '../models/Collection.model'
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

interface NoteType {
  title: string;
  body: string
  collection: string
}

export const createNote = async (req: TypedRequestBody<NoteType>, res: Response<any, { userId: string}>) => {
  try {
    const { title, body, collection } = req.body

    const newNote = await new Note({ title, body, createdBy: res.locals.userId, fromCollection: collection });
    const newNoteDoc = await newNote.save();

    await Collection.findOneAndUpdate({ _id: collection }, {
      $push: {
        "notes": newNoteDoc._id
      }
    })

    return res.status(201).json({ newNote: newNoteDoc  });
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
}

export const getAllNotesOfAUser = async (req: Request, res: Response<any, { userId: string }>) => {
  try {
    const result = await Note.aggregate([
      { $match: { createdBy: new ObjectId(res.locals.userId) }},
      {
        $lookup: {
          from: 'collections',
          localField: 'fromCollection',
          foreignField: '_id',
          as: 'collection',
          pipeline: [
            { $unset: ['notes', 'createdBy', 'createdAt', 'updatedAt'] },
          ]
        },
      },
      {
        $unset: 'fromCollection'
      },
      {
        $unwind: "$collection"
      }
    ])

    res.json(result)
  } catch (err) {
    res.status(404).json({ message: "No notes found!" })
  }
}

export const getAllNotesOfACollection = async (req: Request<{ collectionId: string }>, res: Response<any, { userId: string }>) => {
  try { 
    const { collectionId } = req.params
    const { userId } = res.locals;

    const results = await Collection.aggregate([
      { $match: { "_id": new ObjectId(collectionId), createdBy: new ObjectId(userId) }},
      {
        $lookup: {
          from: 'notes',
          localField: '_id',
          foreignField: 'fromCollection',
          as: 'notes',
          pipeline: [
            {
              $unset: ['fromCollection']
            }
          ]
        }
      }
    ]);

    return res.json({ result: results[0] })
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
}