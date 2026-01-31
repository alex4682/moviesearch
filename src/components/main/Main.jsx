import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";

export const Main = () => {
    const [movies, setMovies] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWYyNmMxYzJlZDczODM1OGVkNzQwYzEwZDRiM2Q5MSIsIm5iZiI6MTc2OTI0MTE5Ni44MTMsInN1YiI6IjY5NzQ3YTZjYzA0Y2E2Yzg2NzY5M2U2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hx6PtiTz0nhjS2TIdmCxCQFR_2n6jSZWwYPlfdTJVto'
        }
    };
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate', options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results)
                console.log(data);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <div>
            <Header active="home"/>
            <h1>Home page</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}