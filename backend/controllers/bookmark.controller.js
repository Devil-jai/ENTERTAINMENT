import { fetchFromRAPID } from "../services/rapid.service.js";
import { User } from "../models/user.model.js";

// Controller function to fetch details and add a bookmark
export async function fetchDetailsAndAddBookmark(req, res) {
    const userId = req.user._id;
    const { type, id } = req.body;
    if (!type || !id) {
        return res.status(400).json({ success: false, message: "Type and ID are required" });
    }

    try {
        const data = await fetchFromRAPID(`https://movies-api14.p.rapidapi.com/${type}/${id}`);
        
        if (!data) {
            return res.status(404).json({ success: false, message: "Content not found" });
        }
        
        const { title, backdrop_path: image, release_date: releaseDate, overview } = data.movie;

        const user = await User.findById(userId);
        const existingBookmark = user.bookmarks.find(bookmark => bookmark.id === id && bookmark.type === type);
        
        if (existingBookmark) {
            return res.status(400).json({ success: false, message: "Already bookmarked" });
        }

        
        user.bookmarks.push({ type, id, title, image, releaseDate, overview });
        await user.save();

        res.status(200).json({ success: true, message: "Bookmark added successfully", content: { title, image, releaseDate, overview } });
    } catch (error) {
        console.error("Error in fetchDetailsAndAddBookmark controller", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Controller function to remove a bookmark
export async function fetchDetailsAndRemoveBookmark(req, res) {
    const userId = req.user._id;
    const { type, id } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user || !user.bookmarks) {
            return res.status(404).json({ success: false, message: "User not found or no bookmarks available" });
        }

        const bookmarkIndex = user.bookmarks.findIndex(bookmark => bookmark.id === id && bookmark.type === type);

        if (bookmarkIndex === -1) {
            return res.status(404).json({ success: false, message: "Bookmark not found" });
        }

        user.bookmarks.splice(bookmarkIndex, 1);
        await user.save();

        res.status(200).json({ success: true, message: "Bookmark removed successfully" });
    } catch (error) {
        console.error("Error in fetchDetailsAndRemoveBookmark controller", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
