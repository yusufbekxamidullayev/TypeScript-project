import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet"
import MovieActorAddForm from "../../components/movie-actor/MovieActorAddForm";
import type { MovieActorDataType } from "../../types/MovieActorType";
import MovieActorTable from "../../components/movie-actor/MovieActorTable";
import type { ActorDataType } from "../../types/ActorTypes";
import type { MovieDataType } from "../../types/MoviesDataType";

const MovieActorPage = () => {
      const [open, setOpen] = useState(false);
  
    const { data } = useGet<MovieActorDataType[]>({ url: "movie_actor", key: ["movie_actors"] });
    const {data:actors} = useGet<ActorDataType[]>({url:"actor" , key: ["actors"]})
    const { data: movies } = useGet<MovieDataType[]>({ url: "movie", key: ["movies"] })
  console.log(data);
  console.log(actors);
  
  

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Movie Actor"}>
        <MovieActorAddForm actors={actors} movies={movies} setOpen={setOpen} />
      </AddModal>

      <MovieActorTable movies={movies} data={data} actors={actors}/>
    </div>
  )
}

export default MovieActorPage
