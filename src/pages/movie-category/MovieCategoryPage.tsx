import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet";
import type { MovieCategoryDataType } from "../../types/MovieCategoryDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { CategoryDataType } from "../../types/CategoryDataType";
import MovieCategoryTable from "../../components/movie-category/MovieCategoryTable";
import MovieCategoryAddForm from "../../components/movie-category/MovieCategoryAddForm";

const MovieCategoryPage = () => {
    const [open, setOpen] = useState(false);

    const { data } = useGet<MovieCategoryDataType[]>({ url: "movie_category", key: ["movie_categories"] });
    const { data: movies } = useGet<MovieDataType[]>({ url: "movie", key: ["movies"] });
    const { data: categories } = useGet<CategoryDataType[]>({ url: "category", key: ["categories"] });

    return (
        <div>
            <AddModal open={open} setOpen={setOpen} text={"Movie Category"}>
                <MovieCategoryAddForm setOpen={setOpen} movies={movies} categories={categories} />
            </AddModal>

            <MovieCategoryTable data={data} movies={movies} categories={categories} />
        </div>
    );
};

export default MovieCategoryPage;
