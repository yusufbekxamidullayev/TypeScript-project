import  { type Dispatch, type SetStateAction } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import type { MovieDataType } from "../../types/MoviesDataType";
import type { ActorAddFormType } from "../actor/ActorAddFormType";
import type { ActorDataType } from "../../types/ActorTypes";

// type ActorFormType = {
//     full_name: string;
//     photo_url: string;
//     birth_year: number;
//     biography: string;
//     country: string;
// };



const MovieActorAddForm = ({ setOpen , movies , actors}: { setOpen: Dispatch<SetStateAction<boolean>> , movies?:MovieDataType[] , actors?:ActorDataType[]}) => {
    const queryClient = useQueryClient()
    const onFinish: FormProps<ActorAddFormType>["onFinish"] = async (values) => {
console.log(values);



        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_actor`, values);
            toast.success("Actor qo'shildi");
            setOpen(false)
            queryClient.invalidateQueries({
                queryKey: ["movie_actors"]
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
                    movie_id:"",
                    actor_id:"",
                    role:""
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item name="movie_id" label="Movies" rules={[{ required: true }]}>
                <Select
                    allowClear
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    options={
                        movies?.map((el) => {
                            return {label: el.title_uz , value: el.id}
                        })
                    }
                />
            </Form.Item>

            <Form.Item name="actor_id" label="Actor" rules={[{ required: true }]}>
                <Select
                    allowClear
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    options={
                        actors?.map((el) => {
                            return { label: el.full_name, value: el.id }
                        })
                    }
                />
            </Form.Item>

            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Input placeholder="Enter Role"/>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default MovieActorAddForm;
