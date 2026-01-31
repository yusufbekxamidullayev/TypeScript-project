import { useState } from "react";
import CategoryAddForm from "../../components/category/CategoryAddForm";
import AddModal from "../../components/AddModal";
import CategoryTablePage from "../../components/category/CategoryTablePage";
import type { CategoryType } from "../../types/CategoryType";
import useGet from "../../hooks/useGet";

const CategoryPage = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGet<CategoryType[]>({ url: "category", key: ["category"] })
  console.log(data);

  return (
    <div>
      <AddModal open={open} setOpen={setOpen} text={"Category"}>
        <CategoryAddForm setOpen={setOpen} />
      </AddModal>
      <CategoryTablePage data={data} />
    </div>
  )
}

export default CategoryPage