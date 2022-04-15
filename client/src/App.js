import logo from './logo.svg';
import { useState } from 'react';
import './App.css'
import { Routes, Route , Link } from "react-router-dom"

import { Layout, Typography, Space } from 'antd';


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {NavBar, NavBar2, Homepage,User,SearchBar,SandP,Favourites,StockDetails,Reset,StockDetails2, Cryptocurrencies,Root, CryptoDetails , CryptoNews , Stocks,StockNews, NASDAQ, MostPopular, NYSE, LSE, SidePanelNews} from "./components/index"


import Login from './components/Login';
import Register from './components/Register';

import { useParams } from "react-router-dom";
import FileUpload from './machineLearning/FileUpload';
import { auth, signInWithEmailAndPassword, signInWithGoogle } from './firebase/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import HighChange from './components/HighChange';
import { LowChange } from './components';
import { useEffect } from 'react';

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//const auth = firebase.auth();
//const firestore = firebase.firestore();
//const [input, label] = generateData();

function App() {

  const [data, setData] = useState(""); 
  useEffect(() => {
    fetch("/api/sample").then(res => res.json()).then(data => setData(data));
  }, []);

  var stockid = "Stock Market";
  
  const [user] = useAuthState(auth);

  const currentstock = useParams();
  console.log(currentstock)
  useEffect(() => {
    if (currentstock!=null) {
      stockid = currentstock.id;
    }
    else{
      stockid = "Stock Market";
    }
  }, [currentstock]);



  console.log(stockid);
  const footerStyle = {
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px"
  };
  
 
  return (
    
    <div className="app">
      <h1>{data}</h1>
      {user == null ? <div>
        <Routes >
          <Route exact path="/" element={<  Root />} />
          <Route exact path="/login" element={<Login></Login>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path = "/reset" element={<div><Reset></Reset></div>}></Route>
          <Route path="/*" element={<Root></Root>} />
        </Routes>
      </div> : <div>
      <div className = "navbar">
          
          <NavBar2 user = {user}></NavBar2>
          <NavBar></NavBar>
          <SearchBar></SearchBar>
          
          
      </div>
      <div className = "main" >
          <Layout>
            <div className = "routes">
              <Routes>
                <Route exact path="/" element={<Root />} />
                <Route path="/*" element={<Login></Login>} />
                  <Route path = "homepage" element = {<div><Homepage></Homepage><SidePanelNews simplified></SidePanelNews></div>}>
          

                  </Route>
                  <Route exact path = "/NASDAQ" element = {<div><NASDAQ></NASDAQ><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/NYSE" element= {<div><NYSE></NYSE><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/LSE" element={<div><LSE></LSE><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/SandP" element={<div><SandP></SandP><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/highchange" element={<div><HighChange></HighChange><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/favourites" element={<div><Favourites></Favourites><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/lowchange" element={<div><LowChange></LowChange><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/mostpopular" element={<div><MostPopular></MostPopular><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/stocks" element={<div><Stocks></Stocks><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/cryptocurrencies" element = {<div><Cryptocurrencies></Cryptocurrencies><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = '/crypto/:coinId' element = {<div><CryptoDetails></CryptoDetails><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = '/stock/:stockId' element = {<div><StockDetails2></StockDetails2></div>}>
                  </Route>
                  <Route exact path = "/cryptonews" element = {<div><CryptoNews></CryptoNews><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/stocknews" element = {<div><StockNews></StockNews><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/predictor" element = {<div><FileUpload></FileUpload><SidePanelNews simplified = {false}></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/user" element = {<div></div>}>
                  </Route>

                  <Route path="/*" element={<h1>Page not Found</h1>} />
              </Routes>
            </div>
            <Routes>
            <Route exact path = "/user" element = {<User style = {{width: "100%"}}></User>}>
                  </Route>
            </Routes>
          </Layout>

      <div style = {footerStyle}>
        <h2>Thank you for visiting Stapp</h2>
        <br/>
        <Typography.Text>
          <Space size="middle">
            <Link to="/">Home</Link>
          

          </Space>
        </Typography.Text>
      </div>
      </div></div>}
      

      
    </div>
  );
}

export default App;
