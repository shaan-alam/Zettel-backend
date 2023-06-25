import { Application } from 'express';
import authRoutes from './auth.route';
import collectionRoutes from './collection.route';
import noteRoutes from './note.route';
import urlRoutes from './url.route';

const routes = (app: Application) => {
  app.use('/auth', authRoutes);
  app.use('/collection', collectionRoutes);
  app.use('/note', noteRoutes);
  app.use('/fetchUrl', urlRoutes);
}

export default routes