import express from 'express'
import { getTvShows , getTvShowsDetails } from '../controllers/tvshows.controller.js'
const router = express.Router()

router.get("/all",getTvShows)
router.get("/:id/details",getTvShowsDetails)

export default router;