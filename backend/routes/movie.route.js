import express from 'express'
import {  getMovieDetails, getMOvies } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/:id/trending",getMovieDetails)
router.get("/trending",getMOvies)
// router.get("/:id/details",getMovieDetails)

export default router;