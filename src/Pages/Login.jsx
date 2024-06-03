import React,{useState} from 'react';
import { Form, Input, Button, Checkbox, message, Spin} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [bigLoading, Setbigloading] = useState(false);
  const onFinish = async (values) => {
    try {
        setLoading(true)
        const { username, password } = values; 
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          Setbigloading(true);
          const { message, token } = await response.json(); 
          localStorage.setItem('token', token);
          window.location.href = '/home';
        } else {
        setLoading(false);
          const errorData = await response.json();
          console.error('Error during login:', errorData.message); 
          message.error(`${errorData.message}`)
        }
      } catch (error) {
        setLoading(false)
        console.error('Error during login:', error);
        alert('An error occurred during login');
        window.location.href = "/";
      }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
    {bigLoading ? (
            <Spin size='large' fullscreen/>
        ) : (<>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-6"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Password" 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            {/* <Checkbox>Remember me</Checkbox> */}
          </Form.Item>

          <Form.Item>
            {!loading ? (
                <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log in
              </Button>
            ) : (<div className="flex justify-center w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"><Spin style={{color: 'white'}}/></div>)}
          </Form.Item>

          <Form.Item>
            <div className="text-center">
              Or <Link to={"/signup"} className="text-blue-500 hover:underline">register now!</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    </>)}
    </>
  );
};

export default Login;
