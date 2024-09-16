/*
 *
 *
 *
 */
import express, { Request, Response } from "express";

export const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'cupcakes' });
});
