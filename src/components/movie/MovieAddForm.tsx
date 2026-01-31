import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { MovieDataType } from "../../types/MoviesDataType";

const MovieAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<MovieDataType>["onFinish"] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie`, values);
            toast.success("Movie qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["movies"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<MovieDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="movieAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                title_uz: "",
                title_ru: "",
                title_en: "",
                description_uz: "",
                description_ru: "",
                description_en: "",
                poster_url: "",
                banner_url: "",
                trailer_url: "",
                video_url: "",
                duration_minutes: 0,
                release_year: 2024,
                imdb_rating: 0,
                age_rating: "",
                country: "",
                language: "",
                is_premium: false,
                is_featured: false,
                is_active: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            {/* Titles */}
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<MovieDataType>
                    label="Title (UZ)"
                    name="title_uz"
                    rules={[{ required: true, message: "Please input title in UZ!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Title (RU)"
                    name="title_ru"
                    rules={[{ required: true, message: "Please input title in RU!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Title (EN)"
                    name="title_en"
                    rules={[{ required: true, message: "Please input title in EN!" }]}
                >
                    <Input />
                </Form.Item>

                {/* URLs */}
                <Form.Item<MovieDataType>
                    label="Poster URL"
                    name="poster_url"
                    rules={[{ required: true, message: "Please input poster URL!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Banner URL"
                    name="banner_url"
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Trailer URL"
                    name="trailer_url"
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Video URL"
                    name="video_url"
                >
                    <Input />
                </Form.Item>

                {/* Numbers */}
                <Form.Item<MovieDataType>
                    label="Duration (minutes)"
                    name="duration_minutes"
                    rules={[{ required: true, message: "Please input duration!" }]}
                >
                    <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Release Year"
                    name="release_year"
                    rules={[{ required: true, message: "Please input release year!" }]}
                >
                    <InputNumber style={{ width: "100%" }} min={1900} max={2030} />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="IMDB Rating"
                    name="imdb_rating"
                >
                    <InputNumber style={{ width: "100%" }} min={0} max={10} step={0.1} />
                </Form.Item>

                {/* Text fields */}
                <Form.Item<MovieDataType>
                    label="Age Rating"
                    name="age_rating"
                >
                    <Select style={{ width: "100%" }} placeholder="Select age rating">
                        <Select.Option value="G">G</Select.Option>
                        <Select.Option value="PG">PG</Select.Option>
                        <Select.Option value="PG-13">PG-13</Select.Option>
                        <Select.Option value="R">R</Select.Option>
                        <Select.Option value="NC-17">NC-17</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Country"
                    name="country"
                >
                    <Input />
                </Form.Item>

                <Form.Item<MovieDataType>
                    label="Language"
                    name="language"
                >
                    <Input />
                </Form.Item>
            </div>

            {/* Descriptions */}
            <Form.Item<MovieDataType>
                label="Description (UZ)"
                name="description_uz"
                rules={[{ required: true, message: "Please input description in UZ!" }]}
            >
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item<MovieDataType>
                label="Description (RU)"
                name="description_ru"
            >
                <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item<MovieDataType>
                label="Description (EN)"
                name="description_en"
            >
                <Input.TextArea rows={3} />
            </Form.Item>


            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MovieAddForm;
