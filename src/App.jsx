import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Main } from "./components/main/Main";
import { Movie } from "./components/movies/Movie";
import { Movies } from "./components/movies/Movies";
import { Actors } from "./components/movies/Actors";
import { Reviews } from "./components/movies/Reviews";

export const App = () => {
    return (
        <BrowserRouter basename="/moviesearch">
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movies" element={<Movies />} >
                        <Route path="/movies/:id" element={<Movie />} >
                            <Route path="/movies/:id/actors" element={<Actors />} />
                            <Route path="/movies/:id/reviews" element={<Reviews />} />
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}