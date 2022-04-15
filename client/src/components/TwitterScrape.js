import React from 'react'
import { useGetTwitterScrapeQuery } from '../services/twitterScrape'

export default function TwitterScrape(props) {


    const { data, isFetching, error } = useGetTwitterScrapeQuery({searchTerm : props.searchTerm, maxTweets:props.count})

    if (error){
        
    }
    if (isFetching){
       
    }

    const tweetContainerStyle = {
        
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: '10px',
        padding: '10px'
        
    }

    if (isFetching){
        return <div style = {tweetContainerStyle}>Loading...</div>
    }

    /*
    "created_at":"2022-03-29T23:57:08.000Z"
"id":1508956452555313200
"id_str":"1508956452555313167"
"full_text":"Bad Day (Daniel Powter) – Wikipedia https://t.co/JYnX5PYlOs"
"truncated":false
"entities":{...}4 items
"source":"<a href="http://publicize.wp.com/" rel="nofollow">WordPress.com</a>"
"in_reply_to_status_id":NULL
"in_reply_to_status_id_str":NULL
"in_reply_to_user_id":NULL
"in_reply_to_user_id_str":NULL
"in_reply_to_screen_name":NULL
"user_id":4887533921
"user_id_str":"4887533921"
"geo":NULL
"coordinates":NULL
"place":NULL
"contributors":NULL
"is_quote_status":false
"retweet_count":0
"favorite_count":0
"reply_count":0
"quote_count":0
"conversation_id":1508956452555313200
"conversation_id_str":"1508956452555313167"
"favorited":false
"retweeted":false
"possibly_sensitive":false
"possibly_sensitive_editable":true
"lang":"pl"
"supplemental_language":NULL
"url":
*/


  return (
    <div>
    {data?.data?.forEach((x)=>{
        <p>
          Date: {x.created_at}
          User: {x.user_id}
          Tweet:  {x.full_text} 
        </p>
    })}
     
        

    }
      //display tweets 
      

      
    </div>

    
    
  )
}
