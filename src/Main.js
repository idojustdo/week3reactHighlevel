import React from 'react';
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {auth} from './shared/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';






function Main() {
   
  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const LogInFB = async () => { 
    

    const user = await signInWithEmailAndPassword(auth,
      id_ref.current.value,
      pw_ref.current.value,);
     
    navigate('/')
  }

  return (
    <Card>
    <Title onClick={()=>{navigate('/')}}>Spill the Beans</Title>
<Container>


<Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
        
        <TextField  id="input-with-sx" label="E-mail" variant="standard"  inputRef={id_ref} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        
        <TextField id="input-with-sx" label="password" variant="standard"  inputRef={pw_ref} />
      </Box>
       
        <Btn1 onClick={LogInFB}> Log in  </Btn1>
    
        <Btn2 onClick={()=>{
        navigate('/SignUp')}}>Sign up</Btn2>
      </Container>

      
    </Card>
     
   

  );
}



const Title =styled.div`
text-align: center;
font-size: 30px;

`


const Card = styled.div`

`


const Container = styled.body`
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


const Btn1 = styled.h4`
font-family: "Anton";
&:hover{  
  
  color : white;
}
`


const Btn2 = styled.h4`

font-family: "Anton";
&:hover{  
  
  color : white;
}
`

export default Main;
