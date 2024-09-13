import express from 'express'
import { searchMovies } from '../controllers/search.controller.js';

const router = express.Router()

router.get("/movie/:query",searchMovies)
// router.get("/:id/tvshowsdetails",getTvShowsDetails)

export default router;