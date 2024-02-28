import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: Result
 *    description: Api Default Formmat
 */

/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: Index Default Api
 *      tags: [Result]
 *      response:
 *        200:
 *          description: Index Default Api Document
 */
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
