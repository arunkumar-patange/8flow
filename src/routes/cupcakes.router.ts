/*
 *
 *
 *
 */
import express, { Request, Response } from "express";
import Cupcake from "../models/cupcake";

export const router = express.Router();

router.use(express.json());


router.get("/", async (_req: Request, res: Response) => {
  const cupcakes = await Cupcake.find({});
  res.status(200).send(cupcakes);
});


router.post("/", async (_req: Request, res: Response) => {
  const cupcake = await Cupcake.create(_req.body);
  res.status(201).send(cupcake);
});


router.get("/:id", async (_req: Request, res: Response) => {
  const db = await Cupcake.findOne({id: _req.params.id});
  if (!db) {
    return res.status(404).send("Cupcake not found");
  }
  res.status(200).send(db);
});


router.put("/:id", async (_req: Request, res: Response) => {
  const db = await Cupcake.findOneAndUpdate({ id: _req.params.id }, _req.body, { new: true });
  if (!db) {
    return res.status(404).send("Cupcake not found");
  }
  res.status(200).send(db);
});


router.delete("/:id", async (_req: Request, res: Response) => {
  const result = await Cupcake.findOneAndDelete({ id: _req.params.id });
  if (!result) {
    return res.status(404).send("Cupcake not found");
  }
  res.status(204).send();
});
