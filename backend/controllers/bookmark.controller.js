import { fetchFromRAPID } from "../services/rapid.service.js";
import { User } from "../models/user.model.js";

// Controller function to fetch details and add a bookmark
export async function fetchDetailsAndAddBookmark(req, res) {
    const { userId } = req.user; // Assuming `protectRoute` middleware adds user info
    const { type, id } = req.body; // Expecting type ('movie' or 'tv') and id

    try {
        // Fetch movie or TV show details from RapidAPI
        const data = await fetchFromRAPID(`https://movies-api14.p.rapidapi.com/${type}/${id}`);
        if (!data) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }

        // Extract title from the fetched data
        const title = type === "movie" ? data.title : data.name;

        // Find the user in the database
        const user = await User.findById(userId);

        // Check if the bookmark already exists
        const existingBookmark = user.bookmarks.find(
            (bookmark) => bookmark.id === id && bookmark.type === type
        );
        if (existingBookmark) {
            return res.status(400).json({ success: false, message: "Already bookmarked" });
        }

        // Add bookmark to the user's bookmarks
        user.bookmarks.push({ type, id, title });
        await user.save();

        // Respond with success
        res.status(200).json({ success: true, message: "Bookmark added successfully", content: data });
    } catch (error) {
        console.error("Error in fetchDetailsAndAddBookmark controller", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
