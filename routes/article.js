const express = require("express");
const router = express.Router();

const Article = require("../models/Article");
const { body, validationResult } = require("express-validator");
const {
  getArticle,
  createArticle,
  updateArticle,
  oneArticle,
  deleteArticle,
} = require("../controllers/ArticleController");

//routes
//GET || all blogs
router.get("/allArticle", getArticle);

//POST || create Article
router.post("/createArticle", createArticle);

//PUT || update article
router.put("/updateArticle/:id", updateArticle);

//GET || single article details
router.get("/getArticle/:id", oneArticle);

//DELETE || delete article
router.delete("/deleteArticle/:id", deleteArticle);

module.exports = router;
