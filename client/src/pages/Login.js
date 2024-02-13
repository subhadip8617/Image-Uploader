import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {Form, Input, message} from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('Image-Uploader-Token')){
        navigate("/");
    }
  }, [navigate])

  const submitHandler = async(values) => {
    try {
        setLoading(true);
        const res = await axios.post('http://localhost:8080/api/v1/user/login', values);
        if(res.data.success){
            setLoading(false);
            localStorage.setItem("Image-Uploader-Token", res.data.token);
            message.success('Login Successful');
            navigate("/");
        }
        else{
            setLoading(false);
            message.error(res.data.msg);
        }
    } catch (err) {
        setLoading(false);
        message.error(err);
    }
}

  return (
    <>
      <div className='register-page d-flex align-items-center justify-content-center'>
          <Form layout='vertical' onFinish={submitHandler}>
              <h1>Login Form</h1>
              <Form.Item label="Email" name="email">
                  <Input />
              </Form.Item>
              {loading && <Spinner/>}
              <Form.Item label="Password" name="password">
                  <Input type='password'/>
              </Form.Item>
              <div className='d-flex align-items-center justify-content-between'>
                  <Link className='btn btn-primary' to="/register">Register Here</Link>
                  <button className='btn btn-primary'> Login </button>
              </div>
          </Form>
      </div>
    </>
  )
}

export default Login