import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    return res.status(200).send({
      result: true,
      message: "",
      data: null
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
