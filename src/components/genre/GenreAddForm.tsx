import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { GenreDataType } from "../../types/GenreDataType";

const GenreAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<GenreDataType>["onFinish"] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre`, values);
            toast.success("Genre qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["genres"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<GenreDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="genreAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                genre_name_uz: "",
                genre_name_ru: "",
                genre_name_en: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<GenreDataType>
                    label="Name (UZ)"
                    name="name_uz"
                    rules={[{ required: true, message: "Please input genre name in UZ!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<GenreDataType>
                    label="Name (RU)"
                    name="name_ru"
                    rules={[{ required: true, message: "Please input genre name in RU!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<GenreDataType>
                    label="Name (EN)"
                    name="name_en"
                    rules={[{ required: true, message: "Please input genre name in EN!" }]}
                >
                    <Input />
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

export default GenreAddForm;
