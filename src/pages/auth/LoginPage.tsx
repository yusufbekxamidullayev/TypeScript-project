import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

type FieldType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      });

      const token = res?.data?.accessToken;

      if (!token) {
        message.error("Token kelmadi. Login ma’lumotlarini tekshir.");
        return;
      }

      localStorage.setItem("token", token);
      toast.success("Login successful ✅");
      navigate("admin/actor" )
    } catch (err) {
      console.log(err);
      toast.error("Login failed ❌");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-[350px] rounded-lg bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
        <h2 className="text-[26px] text-center font-semibold mb-1">Welcome back</h2>
        <p className="text-[#8c8c8c] text-center mb-[24px]">Sign in to your account</p>
        <Form
          name="basic"
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>  

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
