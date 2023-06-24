import { Application } from 'express';
import authRoutes from './auth.route';
import collectionRoutes from './collection.route';
import noteRoutes from './note.route';

const routes = (app: Application) => {
  app.use('/auth', authRoutes);
  app.use('/collection', collectionRoutes);
  app.use('/note', noteRoutes);
}

export default routes