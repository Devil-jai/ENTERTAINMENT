import express from 'express'
import { fetchDetailsAndAddBookmark, fetchDetailsAndRemoveBookmark} from "../controllers/bookmark.controller.js"


const router = express.Router()

router.post('/add',fetchDetailsAndAddBookmark)
router.delete('/remove',fetchDetailsAndRemoveBookmark);

export default router;