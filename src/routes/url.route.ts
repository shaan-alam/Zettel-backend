import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

interface AxiosResponse {
  title: string,
  description: string;
  images: string[],
  duration: number;
  domain: string;
  url: string
}

router.get('/', async (req: Request<{}, {}, {}, { url: string }>, res: Response) => {
  let { url } = req.query;

  if (!url.startsWith('http://')) url = `https://${url}`

  try {
    const result = await axios.get<AxiosResponse>(`https://jsonlink.io/api/extract?url=${url}`);
    const { title, description, images, domain } = result.data;

    res.json({
      success: 1,
      link: url,
      meta: {
        title,
        description,
        image: {
          url: images[0]
        }
      }
    })
  } catch (err) {
    res.status(400).json({ message: (err as any).message })
  }
})

export default router;