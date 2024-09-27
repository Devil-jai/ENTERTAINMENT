import express from 'express'
import {  getMovieDetails, getMOvies, getTop100Movies } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/:id/details",getMovieDetails)
router.get("/all",getMOvies)
router.get("/trending",getTop100Movies)
// router.get("/:id/details",getMovieDetails)

export default router;