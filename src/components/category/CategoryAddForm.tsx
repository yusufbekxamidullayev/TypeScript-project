//categoryAddForm
import { useState, type Dispatch, type SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { CategoryAddFormType } from "./CategoryAddFormType";

const CategoryAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const queryClient = useQueryClient();

    const onFinish: FormProps<CategoryAddFormType>["onFinish"] = async (values) => {

        try {
            await axios.post(
                "https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/category",
                values
            );

            toast.success("Qo'shildi");
            queryClient.invalidateQueries({ queryKey: ["category"] });
            setOpen(false)
        } catch (err) {
            console.error(err);
            toast.error("Xatolik yuz berdi");
        }
    };

    const onFinishFailed: FormProps<CategoryAddFormType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="actor-add"
            style={{ maxWidth: 600 }}
            initialValues={{
                name_uz: "",
                name_ru: "",
                name_en: "",
                slug: "",
                order_number: 0,
                is_active: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-3">
                <Form.Item<CategoryAddFormType>
                    label="Uzbek"
                    name="name_uz"
                    rules={[{ required: true, message: "Uzbek name" }]}
                >
                    <Input style={{ height: 50 }} />
                </Form.Item>

                <Form.Item<CategoryAddFormType>
                    label="Russia"
                    name="name_ru"
                    rules={[{ required: true, message: "Russia name" }]}
                >
                    <Input style={{ height: 50 }} />
                </Form.Item>

                <Form.Item<CategoryAddFormType>
                    label="English"
                    name="name_en"
                    rules={[{ required: true, message: "English name" }]}
                >
                    <Input style={{ height: 50 }} />
                </Form.Item>


                <Form.Item<CategoryAddFormType>
                    label="Slug"
                    name="slug"
                    rules={[
                        { required: true, message: "Slug is required" },
                    ]}
                >
                    <Input style={{ height: 50 }} />
                </Form.Item>

            </div>

            <Form.Item label="InputNumber" name="order_number">
                <InputNumber />
            </Form.Item>

            <Checkbox
                name="is_active"
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Active
            </Checkbox>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryAddForm;