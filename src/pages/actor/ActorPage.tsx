import { useState } from "react";
import AddModal from "../../components/AddModal";
import ActorTable from "../../components/Table"
import useGet from "../../hooks/useGet"
import type { ActorDataType } from "../../types/ActorTypes";
import ActorAddForm from "../../components/actor/ActorAddForm";

const ActorPAge = () => {
      const [open, setOpen] = useState(false);
  
  const { data } = useGet<ActorDataType[]>({ url: "actor", key: ["actors"] })

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Actor"}>
        <ActorAddForm setOpen={setOpen} />
      </AddModal>

      <ActorTable data={data} />
    </div>
  )
}

export default ActorPAge
