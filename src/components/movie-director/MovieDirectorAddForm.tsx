import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { MovieDirectorDataType } from "../../types/MovieDirectorDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { DirectorDataType } from "../../types/DirectorDataType";

const MovieDirectorAddForm = ({ setOpen, movies, directors }: {
    setOpen: Dispatch<SetStateAction<boolean>>,
    movies?: MovieDataType[],
    directors?: DirectorDataType[]
}) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<MovieDirectorDataType>["onFinish"] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_director`, values);
            toast.success("Movie Director qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["movie_directors"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<MovieDirectorDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="movieDirectorAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                movie_id: "",
                director_id: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<MovieDirectorDataType>
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

                <Form.Item<MovieDirectorDataType>
                    label="Rejissor"
                    name="director_id"
                    rules={[{ required: true, message: "Please select a director!" }]}
                >
                    <Select placeholder="Rejissor tanlang">
                        {directors?.map((director) => (
                            <Select.Option key={director.id} value={director.id}>
                                {director.full_name}
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

export default MovieDirectorAddForm;
