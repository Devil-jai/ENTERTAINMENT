import { fetchFromRAPID } from "../services/rapid.service.js";

export async function getTvShowsDetails(req,res) {
    const {id} = req.params;
    try{
        const data = await fetchFromRAPID(`https://movies-api14.p.rapidapi.com/show/${id}`)
        res.status(200).json({success : true , content : data})

    } catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({success : false , message : "Internal Server Error"})
    }
    
}

export async function  getTvShows(req,res) {
    try {
        const data = await fetchFromRAPID("https://movies-api14.p.rapidapi.com/shows")
        res.json( { success : true , content : data})
    } catch (error ){
        if ( error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success : false , message : "Internal Server Error"})
    }
    
}