import React, { useState } from "react";
import { debounce, size } from "lodash";
import { Form, Button, Input, Empty, AutoComplete, Spin, message } from "antd";
import Sidebar from "../Components/Header";
import Title from "antd/es/skeleton/Title";
import DetailMovieCard from "../Components/DetailMovieCard";
import { useNavigate } from "react-router-dom";
import useRequireAuth from "../Components/useRequireAuth";


const AddNewPlaylist = () => {
  useRequireAuth("/");

    const [ loading , Setloading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    return(
        <Sidebar>
            <div className="text-2xl font-bold mb-2"><span>Add New Playlist</span></div>
            <Form
        //   id={'form'}
        //   form={form}
          
        //   layout="horizontal"
        // //   disabled={componentDisabled}
        //   style={{
        //     maxWidth: 600,
        //     minWidth: 200,
            
        //   }}

        className="mt-7"
          id={'form'}
          form={form}
          labelCol={{
            xs: {
              span: 24,
            },
            sm: {
              span: 6,
            },
          }}
          wrapperCol={{
            xs: {
              span: 12,
            },
            sm: {
              span: 14,
            },
          }}
          layout="horizontal"
          style={{
            maxWidth: 600,
          }}
          onFinish={async (values) => {
            Setloading(true);
            try {
              const token = localStorage.getItem("token");
              const {
                name,
                description,
              } = values;
              
              const response = await fetch(
                "http://localhost:5000/playlist/addnewplaylist",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name,
                    description,
                  }),
                }
              );
              if (response.ok) {
                const reply  = await response.json();
                message.success(`${reply.message}`)
                Setloading(false);
                navigate('/home');
              } else {
                const errorData = await response.json();
                message.error(`${errorData.message}`)
                Setloading(false);
              }
            } catch (error) {
                Setloading(false);
              console.error("Error during adding item:", error);
              message.error("An error during creating playlist")
            }
          }}
        >
             <Form.Item
          hasFeedback
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
          hasFeedback
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            form="form"
            wrapperCol={{
              offset: 9,
              span: 16,
            }}
          >
            <Button
              className="bg-blue-600 text-white"
              
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Add Playlist
            </Button>
          </Form.Item>
         
          </Form>
          
        </Sidebar>
    )
}

export default AddNewPlaylist;