import { Request, Response } from 'express';
import Collection from '../models/Collection.model'

export interface TypedRequestBody<T> extends Request {
  body: T
}

export const createCollection = async (req: TypedRequestBody<{ collectionName: string, colorCoding: string }>, res: Response<any, { userId: string }>) => {
  const { collectionName, colorCoding } = req.body;
  const { userId } = res.locals;

  try {
    // Check if a collection with that name already exists
    const isCollectionExisting = await Collection.findOne({ collectionName, createdBy: userId });
    if (isCollectionExisting) {
      return res.status(400).json({ message: 'A collection with that name is already existing! '});
    }

    const newCollection = await new Collection({ collectionName, colorCoding, createdBy: userId });
    const newCollectionDoc = await newCollection.save();

    res.status(201).json({ collection: newCollectionDoc })
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
}

export const getCollections = async (req: Request, res: Response<any, { userId: string }>) => {
  const { userId } = res.locals;
  try {    
    const collections = await Collection.find({ createdBy: userId }); 
    res.json({ collections });
  } catch (err) {
    res.status(404).json({ message: (err as any).message });
  }
}