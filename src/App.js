import React, { useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import SignUp from './SignUp';
import Main from './Main';

import Reply from './page/Reply';
import UpLoad from './UpLoad';
import Alram from './page/Alarm';
import { loadPostFB } from './redux/modules/Post'
import { useSelector, useDispatch } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { auth, db } from "./shared/firebase";
import { deletePostFB } from "./redux/modules/Post";
import {
  onAuthStateChanged,
  signOut
} from 'firebase/auth'
import styled from 'styled-components';

// import {createUserWithEmailAndPassword} from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate()
  // const addPost = getDocs(collection(db,"images"));
  const pic = useSelector((state) => state.Post.list)
  const dispatch = useDispatch()

  React.useEffect(() => { dispatch(loadPostFB()) })

  return (
    <div>
      <Boxes>
        <Title onClick={() => { navigate('/') }}>Spill the Beans</Title>


        <Bt2 onClick={() => {
          signOut(auth);
        }}>Log out</Bt2>


        <Bt1 onClick={() => {
          navigate('/Alram')
        }}>Alram</Bt1>

      </Boxes>

      <Line />
      <Container>
        {pic.map((list, index) => {
          return (

            <Cards key={index} id={list.id}>
              
              <Image><img src={list.image_url} /></Image>
              <Text>{list.text}</Text>
              <Dbutton
              onClick={() => {
                dispatch(deletePostFB(list.id));
                 navigate("/");
              }}
            >Delete-Post</Dbutton>
            </Cards>
          );
        })}


        <Box sx={{ '& > :not(style)': { m: 1 } , position : 'fixed;',
                      bottom : '0;',left : '43%',width:'100%;'}}>
          <Fab color="#212121" aria-label="edit">
            <EditIcon onClick={() => {
              navigate('/UpLoad')
            }} />
          </Fab>
        </Box>



      </Container>

    </div>

  )
}
const Boxes = styled.div`
z-index:;
`

const Title = styled.div`
  width: 100%;
  height : 50px;
  
  
  display: inline-block;
  text-align: left;
  font-size: 30px;

`
const Cards = styled.div`
display: flex;
flex-direction: column; 
justify-content: center; 
align-items: center;

margin-top: 15px;
padding:auto;
max-height:100%;


width: 100%;
`
const Image = styled.div`
width: 100%;
border: 2px solid black

`
const Dbutton = styled.button`
  margin-bottom: 15px;
`
const Text = styled.div`

`

const Bt1 = styled.div`
width: 91%;

text-align: right;
box-sizing: border-box;

margin-right: 15px;
`
const Bt2 = styled.div`
width: 90%;
text-align: right;
margin-right: 15px;

margin-left: 15px;
box-sizing: border-box;

`;

const Line = styled.div`
margin: 16px 0px;
border: 1px dotted black;
`
const Container = styled.div`

border: 2px dotted black;
width: 70%;
margin: 0 auto;
padding: 10px

`

// const Card = styled.div`

// `





function App() {

  const [is_login, setIsLogin] = React.useState(false);

  const logincheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

  };
  useEffect(() => {
    onAuthStateChanged(auth, logincheck);

  }, []);


  return (
    <div className="App">
      <Routes>


        <Route path="/SignUp" element={<SignUp />} />

        {is_login ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Main />} />
        )}
        <Route path="/Reply" element={<Reply />} />
        <Route path="/UpLoad" element={<UpLoad />} />
        <Route path="/Alram" element={<Alram />} />

      </Routes>


    </div>
  );
}

export default App;
