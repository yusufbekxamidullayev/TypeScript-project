import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { MovieCategoryDataType } from "../../types/MovieCategoryDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { CategoryDataType } from "../../types/CategoryDataType";

const MovieCategoryAddForm = ({ setOpen, movies, categories }: {
    setOpen: Dispatch<SetStateAction<boolean>>,
    movies?: MovieDataType[],
    categories?: CategoryDataType[]
}) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<MovieCategoryDataType>["onFinish"] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_category`, values);
            toast.success("Movie Category qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["movie_categories"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<MovieCategoryDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="movieCategoryAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                movie_id: "",
                category_id: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<MovieCategoryDataType>
                    label="Kino"
                    name="movie_id"
                    rules={[{ required: true, message: "Please select a movie!" }]}
                >
                    <Select placeholder="Kino tanlang">
                        {movies?.map((movie) => (
                            <Select.Option key={movie.id} value={movie.id}>
                                {movie.title_uz}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item<MovieCategoryDataType>
                    label="Kategoriya"
                    name="category_id"
                    rules={[{ required: true, message: "Please select a category!" }]}
                >
                    <Select placeholder="Kategoriya tanlang">
                        {categories?.map((category) => (
                            <Select.Option key={category.id} value={category.id}>
                                {category.name_uz}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MovieCategoryAddForm;
