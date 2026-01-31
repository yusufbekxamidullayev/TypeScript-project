import type { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd"; // ✅ DatePicker import
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { DirectorDataType } from "../../types/DirectorDataType";

const DirectorAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<DirectorDataType>["onFinish"] = async (values) => {

        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/director`, values);
            toast.success("Director qo'shildi");
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["directors"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const onFinishFailed: FormProps<DirectorDataType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="directorAdd"
            style={{ maxWidth: 600 }}
            initialValues={{
                full_name: "",
                photo_url: "",
                biography: "",
                country: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<DirectorDataType>
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: "Please input full name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<DirectorDataType>
                    label="Photo URL"
                    name="photo_url"
                    rules={[{ required: true, message: "Please input photo URL!" }]}
                >
                    <Input />
                </Form.Item>

                
            </div>
            <Form.Item<DirectorDataType>
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please input country!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<DirectorDataType>
                label="Biography"
                name="biography"
                rules={[{ required: true, message: "Please input biography!" }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default DirectorAddForm;