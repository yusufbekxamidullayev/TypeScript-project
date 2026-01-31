import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet";
import type { MovieDirectorDataType } from "../../types/MovieDirectorDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { DirectorDataType } from "../../types/DirectorDataType";
import MovieDirectorTable from "../../components/movie-director/MovieDirectorTable";
import MovieDirectorAddForm from "../../components/movie-director/MovieDirectorAddForm";

const MovieDirectorPage = () => {
    const [open, setOpen] = useState(false);

    const { data } = useGet<MovieDirectorDataType[]>({ url: "movie_director", key: ["movie_directors"] });
    const { data: movies } = useGet<MovieDataType[]>({ url: "movie", key: ["movies"] });
    const { data: directors } = useGet<DirectorDataType[]>({ url: "director", key: ["directors"] });

    return (
        <div>
            <AddModal open={open} setOpen={setOpen} text={"Movie Director"}>
                <MovieDirectorAddForm setOpen={setOpen} movies={movies} directors={directors} />
            </AddModal>

            <MovieDirectorTable data={data} movies={movies} directors={directors} />
        </div>
    );
};

export default MovieDirectorPage;
