import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Layout from "../components/layout/Layout";
import Spinner from '../components/Spinner'
import ImageGallery from '../components/ImageGallery';

const HomePage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem('Image-Uploader-Token')){
        navigate("/login");
    }
  }, [navigate])

  const getUserData = async() => {
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Image-Uploader-Token")
        }
      })
      if(res.data.success){
        setUserData(res.data.data)
      }
      else{
        message.error(res.data.msg)
        localStorage.removeItem('Image-Uploader-Token')
      }
    } catch (error) {
      message.error(error)
      localStorage.removeItem('Image-Uploader-Token')
    }
  }
  // console.log(userData)
  useEffect(() => {
    getUserData();
  }, [])

  // const convertBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);

  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  // };

  const handleChoosePhoto = async (e) => {
    // const base64 = await convertBase64(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile({
          "uploader" : userData.email,
          "photo" : reader.result
        });
      };
      reader.readAsDataURL(file);
    }
    // setSelectedFile({
    //   "uploader" : userData.email,
    //   "photo" : base64
    // })
  }

  const handleUpload = async() => {
    if(!selectedFile){
      message.error('Please choose a file');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8080/api/v1/photo/uploadPhoto', selectedFile);
      if(res.data.success){
          setLoading(false);
          message.success(res.data.msg);
          setSelectedFile(null);
          getUserData();
      }
      else{
          setLoading(false);
          message.error(res.data.msg);
      }
      
    } catch (error) {
      setLoading(false)
      message.error(error)
    }
  }

  return (
    <Layout userData = {userData}>
      <div className='mainPage'>
        {/* <h1>This is the HomePage</h1> */}
        <h2>Upload Photo</h2>
        <div>
          <input type='file' onChange={handleChoosePhoto}/>
          {loading && <Spinner />}
          <button onClick={handleUpload}> Upload </button>
          <div className='selsectedPhotoDiv d-flex align-items-center justify-content-center'>
            {/* {selectedFile && <img src={selectedFile.photo}/>} */}
          </div>
        </div>
      </div>
      {userData && <ImageGallery photos = {userData.uploadedPhotos}/>}
    </Layout>
  )
}

export default HomePage