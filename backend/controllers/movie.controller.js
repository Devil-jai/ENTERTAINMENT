import { fetchFromRAPID } from "../services/rapid.service.js"

export async function getMovieDetails(req, res) {
	const {id} = req.params;
	try {
		// const data = await fetchFromRAPID("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const data = await fetchFromRAPID(`https://movies-api14.p.rapidapi.com/movie/${id}`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
        if(error.message.includes("404")){
			return res.status(404).send(null)
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMOvies(req,res) {
    
    try {
        const data = await fetchFromRAPID(`https://movies-api14.p.rapidapi.com/movies`)
        res.json({success:true,content:data})
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}