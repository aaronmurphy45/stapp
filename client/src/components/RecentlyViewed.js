import React from 'react'
import { Timeline } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';




const addRecent= (id) => {

  if (recentlyViewed.includes(id)) {
    console.log("Already in list");
    recentlyViewed.splice(recentlyViewed.indexOf(id), 1);
  }
  if (recentlyViewed.length == 5) {
    recentlyViewed.pop();
        recentlyViewed.shift();
  }
  recentlyViewed.push(id);
  
    
}
const addRecentCrypto = (id) => {

  if (recentlyViewedCrypto.includes(id)) {
    recentlyViewedCrypto.splice(recentlyViewedCrypto.indexOf(id), 1);
  }
  if (recentlyViewedCrypto.length == 5) {
    recentlyViewedCrypto.pop();
        recentlyViewedCrypto.shift();
  }
  recentlyViewedCrypto.push(id);
}



const recentlyViewed = [];
const recentlyViewedCrypto = [];


function RecentlyViewed() {



  const recentlyViewedConatinerStyle = {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    marginTop: '10px',
    
    //DISPLAY CONTENTS BESIDE EACH OTHER
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',


  }
  const tablestyle = {
    backgroudnColor: 'white',
    width: '40%',
    boxShadow: '0px 0px 5px #000000',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px',

  }
  const linkstyle = { 
    padding: '10px',

  }


  return (
    <div style = {recentlyViewedConatinerStyle}>

      <div style = {tablestyle}>
      <p>Recently Viewed Stocks</p>
      {recentlyViewed.length == 0 ?
      <p>No Stocks Viewed</p> :
    
      <Timeline>
    {recentlyViewed.map(item => (
      <Link to = {`/stock/${item}`} style = {linkstyle}>
          <Timeline.Item>{item}</Timeline.Item>
          <hr></hr>
      </Link>
    ))}
    </Timeline>
  }
    </div>
    
    <div style = {tablestyle}>
    <p>Recently Viewed Cryptocurrencies</p>
    {recentlyViewedCrypto.length == 0 ?
    <p>No Cryptocurrencies Viewed</p> :
    <Timeline>
    {recentlyViewedCrypto.map(item => (
      <Link to = {`/crypto/${item}`} style = {linkstyle}>
          <Timeline.Item>{item}</Timeline.Item>
          <hr></hr>
      </Link>
    ))}
    
    </Timeline>
}
    </div>
    </div>

    
  )
}

export { RecentlyViewed, recentlyViewed, recentlyViewedCrypto, addRecent, addRecentCrypto} 