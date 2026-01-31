import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { MovieGenreDataType } from "../../types/MovieGenreDataType";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { GenreDataType } from "../../types/GenreDataType";

const MovieGenreAddForm = ({ setOpen, movies, genres }: {
    setOpen: Dispatch<SetStateAction<boolean>>,
    movies?: MovieDataType[],
    genres?: GenreDataType[]
}) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<MovieGenreDataType>["onFinish"] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_genre`, values);
            toast.success("Movie Genre qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["movie_genres"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<MovieGenreDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="movieGenreAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                movie_id: "",
                genre_id: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<MovieGenreDataType>
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

                <Form.Item<MovieGenreDataType>
                    label="Janr"
                    name="genre_id"
                    rules={[{ required: true, message: "Please select a genre!" }]}
                >
                    <Select placeholder="Janr tanlang">
                        {genres?.map((genre) => (
                            <Select.Option key={genre.id} value={genre.id}>
                                {genre.genre_name_uz}
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

export default MovieGenreAddForm;
