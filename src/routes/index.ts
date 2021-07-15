import { NextFunction, Request, Response } from "express";
import express from 'express';

const router = express.Router();

// index route api.
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.query;

    return res.json(`Hello Express ! ${text ?? ""}`); 
  } catch(err) {
    return next(err);
  }
});

export default router;