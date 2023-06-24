import mongoose from 'mongoose'

const dbConnect = () => {
  mongoose.connect(`${process.env.MONGO_URI}`);
  const db = mongoose.connection;
  db.once('open', () => console.log(`Connected to DB: `.cyan.underline.bold))
}

export default dbConnect;