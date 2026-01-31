import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet";
import type { MovieGenreDataType } from "../../types/MovieGenreDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { GenreDataType } from "../../types/GenreDataType";
import MovieGenreTable from "../../components/movie-genre/MovieGenreTable";
import MovieGenreAddForm from "../../components/movie-genre/MovieGenreAddForm";

const MovieGenrePage = () => {
    const [open, setOpen] = useState(false);

    const { data } = useGet<MovieGenreDataType[]>({ url: "movie_genre", key: ["movie_genres"] });
    const { data: movies } = useGet<MovieDataType[]>({ url: "movie", key: ["movies"] });
    const { data: genres } = useGet<GenreDataType[]>({ url: "genre", key: ["genres"] });

    return (
        <div>
            <AddModal open={open} setOpen={setOpen} text={"Movie Genre"}>
                <MovieGenreAddForm setOpen={setOpen} movies={movies} genres={genres} />
            </AddModal>

            <MovieGenreTable data={data} movies={movies} genres={genres} />
        </div>
    );
};

export default MovieGenrePage;
