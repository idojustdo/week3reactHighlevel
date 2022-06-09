import React from 'react';
import styled from 'styled-components'
import { storage } from './shared/firebase';
import {ref,uploadBytes, getDownloadURL} from 'firebase/storage'
import { useState, useRef } from "react";
import {auth, db} from"./shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'


import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function UpLoad() {

const file_link_ref = useRef(null)
const navigate = useNavigate();
const text_ref = useRef(null);
const [imgBase64, setImgBase64] = useState(""); 


const UpLoadFB = async (e) => {
  

  const upload_file = await uploadBytes(
    ref(storage, `images/${e.target.files[0].name}`),
    e.target.files[0]
  );


  const file_url = await getDownloadURL(upload_file.ref)
  file_link_ref.current = {url: file_url};
  };



  const Input = styled('input')({
    display: 'none',
  });
   
  const UpImage = async () => {

    
    const url_data = await addDoc(collection(db, "images"), {
      image_url: file_link_ref.current?.url,
      text : text_ref.current.value
    });
    

    navigate('/')
  };
  

  return (

    <div>
      <Title onClick={()=>{navigate('/')}}>Spill the Beans</Title>
      <Line />
      <Container>
      <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="imgFile" type="file"  onChange={UpLoadFB} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Stack>
    <Preview>미리보기</Preview>
    <input type="text" style={{marginBottom :"10px"  }} ref={text_ref} />
    <label htmlFor="contained-button">
        <Button  variant="contained" component="span" onClick={UpImage}>
          Upload
        </Button>
        </label>
      </Container>
      
    </div>
  );
}

const Container = styled.body`
background-size: cover;

width: 400px;
height: 450px;
padding: 50px;
border: 2px solid black;
display: flex;
flex-direction: column;
align-content: flex-start;
float: center;
margin: 40px 20px 40px 20px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);

text-align: center;

`

const Title =styled.div`
text-align: center;
font-size: 30px;

`
const Line = styled.hr`
margin: 16px 0px;
border: 1px dotted black;
`

const Preview= styled.div`
width:30%
height:30%
background-color: #efefef;
z-index: 99 ;
`
export default UpLoad;