import { Movie } from "./Movie";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Reviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWYyNmMxYzJlZDczODM1OGVkNzQwYzEwZDRiM2Q5MSIsIm5iZiI6MTc2OTI0MTE5Ni44MTMsInN1YiI6IjY5NzQ3YTZjYzA0Y2E2Yzg2NzY5M2U2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hx6PtiTz0nhjS2TIdmCxCQFR_2n6jSZWwYPlfdTJVto'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, options)
            .then(response => response.json())
            .then(data => {
                setReviews(data.results);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    return (
        <div>
            <Movie />
            <h1>Reviews:</h1>
            <ul>
                {reviews && reviews.map(review => (
                    <li key={review.id} style={{marginBottom:"20px"}}>
                        <h3>Author: {review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}