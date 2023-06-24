import { Request, Response } from 'express';
import Collection from '../models/Collection.model'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export const createCollection = async (req: TypedRequestBody<{ collectionName: string, colorCoding: string }>, res: Response) => {
  const { collectionName, colorCoding } = req.body;

  try {
    // Check if a collection with that name already exists
    const isCollectionExisting = await Collection.findOne({ collectionName });
    if (isCollectionExisting) {
      return res.status(400).json({ message: 'A collection with that name is already existing! '});
    }

    const newCollection = await new Collection({ collectionName, colorCoding });
    const newCollectionDoc = await newCollection.save();

    res.status(201).json({ collection: newCollectionDoc })
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
}

export const getCollections = async (req: Request, res: Response) => {
  try {    
    const collections = await Collection.find({}); 
    res.json({ collections });
  } catch (err) {
    res.status(404).json({ message: (err as any).message });
  }
}