import logo from './logo.svg';
import './App.css'
import { Routes, Route , Link } from "react-router-dom"

import { Layout, Typography, Space } from 'antd';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {NavBar, NavBar2, Homepage,User, Exchanges,Favourites,StockDetails, Cryptocurrencies,Root, CryptoDetails , CryptoNews , Stocks,StockNews, NASDAQ, MostPopular, NYSE, LSE, SidePanelNews} from "./components/index"


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
 
  return (
    
    <div className="app">

      {user == null ? <div>
        <Routes >
          <Route exact path="/" element={<  Root />} />
          <Route exact path="/login" element={<Login></Login>} />
          <Route exact path="/register" element={<Register/>} />
        </Routes>
      </div> : <div>
      <div className = "navbar">
          
          <NavBar2 user = {user}></NavBar2>
          <NavBar></NavBar>
          
          
      </div>
      <div className = "main" >
          <Layout>
            <div className = "routes">
              <Routes>
                <Route exact path="/" element={<Root />} />
                  <Route path = "homepage" element = {<div><Homepage></Homepage><SidePanelNews ></SidePanelNews></div>}>

                  </Route>
                  <Route exact path = "/NASDAQ" element = {<div><NASDAQ></NASDAQ><SidePanelNews ></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/NYSE" element= {<NYSE></NYSE>}>
                  </Route>
                  <Route exact path = "/LSE" element={<LSE></LSE>}>
                  </Route>
                  <Route exact path = "/highchange" element={<HighChange></HighChange>}>
                  </Route>
                  <Route exact path = "/favourites" element={<div><Favourites></Favourites><SidePanelNews></SidePanelNews></div>}>
                  </Route>
                  <Route exact path = "/lowchange" element={<LowChange></LowChange>}>
                  </Route>
                  <Route exact path = "/mostpopular" element={<MostPopular></MostPopular>}>
                  </Route>
                  <Route exact path = "/stocks" element={<Stocks></Stocks>}>
                  </Route>
                  <Route exact path = "/exchanges" element={<Exchanges></Exchanges>}>
                  </Route>
                  <Route exact path = "/cryptocurrencies" element = {<Cryptocurrencies></Cryptocurrencies>}>
                  </Route>
                  <Route exact path = '/crypto/:coinId' element = {<CryptoDetails></CryptoDetails>}>
                  </Route>
                  <Route exact path = '/stock/:stockId' element = {<div><StockDetails></StockDetails></div>}>
                  </Route>
                  <Route exact path = "/cryptonews" element = {<CryptoNews></CryptoNews>}>
                  </Route>
                  <Route exact path = "/stocknews" element = {<CryptoNews></CryptoNews>}>
                  </Route>
                  <Route exact path = "/predictor" element = {<FileUpload></FileUpload>} ></Route>
                  <Route exact path = "/user" element = {<User style = {{width: "100%"}}></User>}>
                  </Route>
                  <Route path="*" element={<h1>Page not Found</h1>} />
              </Routes>
            </div>
          </Layout>

      <div className = "footer" >
          <Typography.Title level = {5} style = {{color : 'white', textAlign: "center"}}>
           CrypToYou <br/>
           Created By Aaron Murphy <br/>
           All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to = "/">Home</Link>
            <Link to = "/exchange">Exchange</Link>
            <Link to = "/news">News</Link>
            <Link to = "/cryptocurrencies">CryptoCurrencies</Link>

          </Space>
      </div>
      </div></div>}
      

      
    </div>
  );
}

export default App;
