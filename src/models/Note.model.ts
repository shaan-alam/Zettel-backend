import mongoose from 'mongoose';

export interface NoteDocument extends mongoose.Document {
  title: string;
  linkedNotes: NoteDocument[];
  body: string
  createdBy: string;
}

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  linkedNotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'note' }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model<NoteDocument>('Note', NoteSchema)
