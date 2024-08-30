import express from 'express'
import {  getTrandingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending",getTrandingMovie)
// router.get("/:id/trailers",getMovieTrailers
// router.get("/:id/details",getMovieDetails)

export default router;