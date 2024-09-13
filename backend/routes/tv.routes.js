import express from 'express'
import { getTvShows , getTvShowsDetails } from '../controllers/tvshows.controller.js'
const router = express.Router()

router.get("/trending",getTvShows)
router.get("/:id/tvshowsdetails",getTvShowsDetails)

export default router;