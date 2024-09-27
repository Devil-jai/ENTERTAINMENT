import express from 'express'
import { fetchDetailsAndAddBookmark} from "../controllers/bookmark.controller.js"


const router = express.Router()

router.post('/add',fetchDetailsAndAddBookmark)
// router.delete('/bookmark',removeBookmark);

export default router;