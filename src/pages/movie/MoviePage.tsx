import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet";
import type { MovieDataType } from "../../types/MoviesDataType";
import MovieTable from "../../components/movie/MovieTable";
import MovieAddForm from "../../components/movie/MovieAddForm";

const MoviePage = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGet<MovieDataType[]>({ url: "movie", key: ["movies"] });

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Movie"}>
        <MovieAddForm setOpen={setOpen} />
      </AddModal>

      <MovieTable data={data} />
    </div>
  );
};

export default MoviePage;
