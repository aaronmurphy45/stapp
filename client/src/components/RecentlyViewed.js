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



const recentlyViewed = [];


function RecentlyViewed() {

  
  console.log("RecentlyViewed");
  console.log(recentlyViewed);

  const recentlyViewedConatinerStyle = {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    marginTop: '10px',

  }


  return (
    <div style = {recentlyViewedConatinerStyle}>
      <p>Recently Viewed Stocks</p>
      <Timeline>
    {recentlyViewed.map(item => (
      <Link to = {`/stock/${item}`}>
          <Timeline.Item>{item}</Timeline.Item>
          <hr></hr>
      </Link>
    ))}
    </Timeline>
    </div>

    
  )
}

export { RecentlyViewed, recentlyViewed, addRecent} 