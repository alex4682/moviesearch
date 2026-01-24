import { Movie } from "./Movie";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Actors = () => {
    const { id } = useParams();
    const [actors, setActors] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWYyNmMxYzJlZDczODM1OGVkNzQwYzEwZDRiM2Q5MSIsIm5iZiI6MTc2OTI0MTE5Ni44MTMsInN1YiI6IjY5NzQ3YTZjYzA0Y2E2Yzg2NzY5M2U2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hx6PtiTz0nhjS2TIdmCxCQFR_2n6jSZWwYPlfdTJVto'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options)
            .then(response => response.json())
            .then(data => {
                setActors(data.cast);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    return (
        <div>
            <Movie id={id} />
            <h1>Actors:</h1>
            <ul style={{listStyleType:"none", padding:0, display:"flex", flexWrap:"wrap", gap:"40px"}}>
                {actors && actors.map(actor => (
                    <li key={actor.id} style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"20px"}}>
                        <img src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.name}/>
                        {actor.name} as {actor.character}
                    </li>
                ))}
            </ul>
        </div>
    )
};
