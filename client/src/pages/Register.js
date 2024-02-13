import React, {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {Form, Input, message} from 'antd'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('Image-Uploader-Token')){
        navigate("/");
    }
  }, [navigate])

  const submitHandler = async (values) =>{
    try {
        setLoading(true);
        const res = await axios.post('http://localhost:8080/api/v1/user/register', values);
        console.log(res)
        if(res.data.success){
            message.success(res.data.msg);
            setLoading(false);
            navigate("/login");
        }
        else{
            setLoading(false);
            message.error(res.data.msg);
        }
        setLoading(false)
      } catch (err) {
          setLoading(false);
          message.error(err);
      }
  }

  return (
    <>
      <div className='register-page d-flex align-items-center justify-content-center'>
            <Form layout='vertical' onFinish={submitHandler}>
                {loading && <Spinner/>}
                <h1>Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link className='btn btn-primary' to="/login"> Login Here</Link>
                    <button className='btn btn-primary'> Register </button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Register