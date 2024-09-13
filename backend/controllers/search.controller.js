import { fetchFromRAPIDSearch } from "../services/rapid.search.service.js";


export async function searchMovies(req,res){
    const { query } = req.params;

    try {
        const response = await fetchFromRAPIDSearch("https://movies-api14.p.rapidapi.com/search")
    

    // if(response.results.length === 0){
    //     return res.status(404).send(null)
    // }
  

    res.status(200).json({succcess : true , content : response});
} catch(error){
    console.log("Error in searchMovie controller", error.message);
    res.status(500).json({succcess : false , message : "Internal Server Error"})
}
}