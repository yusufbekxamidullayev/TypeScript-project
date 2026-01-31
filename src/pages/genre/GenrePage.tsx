import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet";
import type { GenreDataType } from "../../types/GenreDataType";
import GenreTable from "../../components/genre/GenreTable";
import GenreAddForm from "../../components/genre/GenreAddForm";

const GenrePage = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGet<GenreDataType[]>({ url: "genre", key: ["genres"] });

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Genre"}>
        <GenreAddForm setOpen={setOpen} />
      </AddModal>

      <GenreTable data={data} />
    </div>
  );
};

export default GenrePage;
