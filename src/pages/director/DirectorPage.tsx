import { useState } from "react";
import AddModal from "../../components/AddModal";
import useGet from "../../hooks/useGet"
import DirectorTable from "../../components/director/directorTable";
import DirectorAddForm from "../../components/director/DirectorAddForm";
import type { DirectorDataType } from "../../types/DirectorDataType";

const DirectorPage = () => {
      const [open, setOpen] = useState(false);
  
  const { data } = useGet<DirectorDataType[]>({ url: "director", key: ["directors"] })

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Director"}>
        <DirectorAddForm setOpen={setOpen} />
      </AddModal>

      <DirectorTable data={data} />
    </div>
  )
}

export default DirectorPage
