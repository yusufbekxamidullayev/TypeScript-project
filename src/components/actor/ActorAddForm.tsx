import  { type Dispatch, type SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { ActorAddFormType } from "./ActorAddFormType";

// type ActorFormType = {
//     full_name: string;
//     photo_url: string;
//     birth_year: number;
//     biography: string;
//     country: string;
// };



const ActorAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient()
    const onFinish: FormProps<ActorAddFormType>["onFinish"] = async (values) => {
        const payload = {
            ...values,
            birth_year: values.birth_year.year(),
        }



        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/actor`, payload);
            toast.success("Actor qo'shildi");
            setOpen(false)
            queryClient.invalidateQueries({
                queryKey: ["actors"]
            })
        } catch (err) {
            console.log(err);
            toast.error("Xatolik ketti")
        }
    };



    const onFinishFailed: FormProps<ActorAddFormType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Form
            layout="vertical"
            name="actorAdd"
            style={{ maxWidth: 600 }}
            initialValues={
                {
                    full_name: "",
                    photo_url: "",
                    birth_year: dayjs(0),
                    biography: "",
                    country: "",
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="grid grid-cols-2 gap-2">
                <Form.Item<ActorAddFormType>
                    label="Full Name"
                    name="full_name"
                    rules={[{ required: true, message: "Please input full name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ActorAddFormType>
                    label="Photo URL"
                    name="photo_url"
                    rules={[{ required: true, message: "Please input photo URL!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Birth Year" name="birth_year">
                    <DatePicker style={{ width: "100%" }} picker="year" />
                </Form.Item>

                <Form.Item<ActorAddFormType>
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: "Please input country!" }]}
                >
                    <Input />
                </Form.Item>
            </div>

            <Form.Item<ActorAddFormType>
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

export default ActorAddForm;
