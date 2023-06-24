import express from 'express';
import verifyTokenFromHeaders from '../middlewares/verifyToken.middleware';
import { createCollection, getCollections } from '../controllers/collection.controller';

const router = express.Router();

router.get('/', verifyTokenFromHeaders, getCollections);
router.post('/create', verifyTokenFromHeaders, createCollection);

export default router;