import mongoose from 'mongoose';

export interface NoteDocument extends mongoose.Document {
  title: string;
  linkedNotes: NoteDocument[];
  body: string
  createdBy: string;
  fromCollection: string 
}

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  linkedNotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'notes' }
  ],
  fromCollection: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'collections',
  },
  body: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
}, { timestamps: true })

export default mongoose.model<NoteDocument>('Note', NoteSchema)
