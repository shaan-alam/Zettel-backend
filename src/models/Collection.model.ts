import mongoose, { Collection } from 'mongoose';
import { NoteDocument } from './Note.model';

export interface CollectionDocument extends mongoose.Document {
  collectionName: string;
  colorCoding: string;
  createdAt: string;
  notes: NoteDocument[]
}

const CollectionSchema = new mongoose.Schema({
  collectionName: {
    type: String,
    required: true
  },
  colorCoding: {
    type: String,
    required: true
  },
  notes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'note' }
  ]
}, { timestamps: true })

export default mongoose.model<CollectionDocument>('Collection', CollectionSchema);