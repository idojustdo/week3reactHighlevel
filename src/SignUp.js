import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged ,
  signOut
} from "firebase/auth";



import { auth, db } from "./shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function SignUp() {
  
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  
  const signupFB = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    
      
    const user_data = await addDoc(collection(db, "users"), {
      user_id: id_ref.current.value,
      name: name_ref.current.value,
      use_pw: pw_ref.current.value
    });
    signOut(auth)
    navigate('/')
  }
    return (
      <>
      <Title onClick={()=>{navigate('/')}}>Spill the Beans</Title>
      <Container>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
        
        <TextField  id="input-with-sx" label="E-mail" variant="standard"  inputRef={id_ref} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
        
        <TextField  id="input-with-sx" label="NickName" variant="standard"  inputRef={name_ref} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
        
        <TextField  id="input-with-sx" label="Password" variant="standard"  inputRef={pw_ref} />
        </Box>
      <Btn1 onClick={signupFB}>Sign Up</Btn1>

      </Container>
      </>
      
      
   
  );
};

const Container = styled.div`
background-size: cover;
background-color: ;
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


const Btn1 = styled.p`
&:hover{  
  
  color : white;
`



export default SignUp;