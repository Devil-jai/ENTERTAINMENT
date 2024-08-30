import { fetchFromRAPID } from "../services/RAPID.service.js"

export async function getTrandingMovie(req,res) {
    
    try {
        const data = await fetchFromRapid("https://movies-api14.p.rapidapi.com/movies");
        console.log(data.movies);
        const randomMovie = data.movies[Math.floor(Math.random() * data.movies?.length)];
    
        res.json({ success: true, content: randomMovie });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    
}

// export async function getMovieTrailers(req,res) {
//     const {id} = req.params;
//     try {
//         const data = await fetchFromRAPID(`https://imdb-top-100-movies.p.rapidapi.com/${id}`)
//         res.json({success:true,trailers:data.resultsb})
//     } catch (error) {
//         if(error.message.includes("404")){
//             return res.status(404).send(null);
//         }
//         res.status(500).json({success:false,message:"Internal Server Error"})
//     }
// }

export async function getMovieDetails(req,res) {
    
}