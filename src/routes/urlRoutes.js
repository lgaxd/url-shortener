import express from "express";
import { shortenUrl, getUrl } from "../controllers/urlController.js";

const routes = (router) => {
  console.log("Setting up routes...");
  router.use(express.json());
  router.post("/shorten", shortenUrl);
  router.get("/:code", getUrl);
};

export default routes;
