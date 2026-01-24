import { Header } from "../header/Header.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Movies = ({setId}) => {
    const [movies, setMovies] = useState(null);
    const [q, setQ] = useState("");
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWYyNmMxYzJlZDczODM1OGVkNzQwYzEwZDRiM2Q5MSIsIm5iZiI6MTc2OTI0MTE5Ni44MTMsInN1YiI6IjY5NzQ3YTZjYzA0Y2E2Yzg2NzY5M2U2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hx6PtiTz0nhjS2TIdmCxCQFR_2n6jSZWwYPlfdTJVto'
        }
    };
    const search = (e) => {
        e.preventDefault();
        fetch('https://api.themoviedb.org/3/search/movie?language=en-US&query=' + q, options)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results)
                console.log(data);
            })
            .catch(err => console.error(err));
    };
    return (
        <div>
            <Header active="movies" />
            <h1>Movies Page</h1>
            <form onSubmit={search}>
                <input type="text" placeholder="Search for a movie..." value={q} onChange={(e) => setQ(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <ul>{movies && movies.map(movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`} onClick = {() => setId(movie.id)}>{movie.title}</Link>
                </li>
            ))}</ul>
        </div>
    )
}