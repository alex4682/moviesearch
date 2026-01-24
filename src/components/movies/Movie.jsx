import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from '../header/Header';
import { Link } from 'react-router-dom';
export const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWYyNmMxYzJlZDczODM1OGVkNzQwYzEwZDRiM2Q5MSIsIm5iZiI6MTc2OTI0MTE5Ni44MTMsInN1YiI6IjY5NzQ3YTZjYzA0Y2E2Yzg2NzY5M2U2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hx6PtiTz0nhjS2TIdmCxCQFR_2n6jSZWwYPlfdTJVto'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div><Header /><h1>Loading...</h1></div>;
    }

    if (!movie) {
        return <div><Header /><h1>Movie not found</h1></div>;
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', gap: '20px', margin: '20px' }}>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <h1>{movie.title} {movie.release_date ? `(${movie.release_date.split('-')[0]})` : ''}</h1>
                    <div>
                        <h2>Rating</h2>
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <div>
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>
                    <div>
                        <h2>Genres</h2>
                        <p>{movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                    </div>
                </div>
                <br />
            </div>
            <div>
                <h3>Actors</h3>
                <Link to={`/movies/${id}/actors`}>View Actors</Link>
                <h3>Reviews</h3>
                <Link to={`/movies/${id}/reviews`}>View Reviews</Link>
            </div>
        </div>
    )
}