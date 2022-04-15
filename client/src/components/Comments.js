
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, dbs} from '../firebase/firebase-config';
import React, { createElement, useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { use } from 'express/lib/router';



export function Comments(props){

    const [comments , setComments] = useState([]);
    const [caheck , setCaheck] = useState(false);
    const [likesx , setLikesx] = useState(0);
    const [dislikesx , setDislikesx] = useState(0);
    const sss = props.stockid
    const action = null

    var commentx;
    var likes, dislikes=0;
    var commentlikes;
    var commentdislikes;
    

    var arrayObj = [];
    
    if (caheck == false) {
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${sss}`)
    db.once('value', function(snapshot) {
        var comments = snapshot.val()
  
        for (var key in comments) {
            arrayObj.push(comments[key])
        }

        setComments(arrayObj)
        setCaheck(true)
    }
    )
  }
    

    useEffect(() => {
  
        setLikesx(likes)
        setDislikesx(dislikes)
        
    }, [likes, dislikes])
    


    

    const commentStyle = {
      backgroundColor: "white",
      borderRadius: "15px",
      padding: "10px",
      margin: "10px",
      width: "100%",
      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      border: "1px solid #e8e8e8",
      fontSize: "14px",
     fontWeight: "bold",

    }

    const commentAuthStyle = {
      color: 'black',
      fontSize: '12px',
      fontWeight: 'bold',
      margin: '0px',
    }

const addComment = async (comment, email, stock) => {
  // add comment to database
   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)

       db.once('value', function(snapshot) {
           if (snapshot.val() == null) {
               db.push({
                   comment: comment,
                   email: email,
                   likes: 0,
                   dislikes: 0
               })
           }
           else {
               
               const len = Object.keys(snapshot.val()).length
               const commentx = {
                   id: len,
                   author: email,
                   comment: comment,
                   date: new Date().toLocaleString(),
                   likes: 0,
                   dislikes: 0
               }
               db.push(commentx)
           }

       })
   
}


function addLike(id, stock){
   
   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
   db.once('value', function(snapshot) {
       var comments = snapshot.val()
      
       for (var key in comments) {
           if (comments[key].id == id) {
               comments[key].likes += 1
               
               db.set(comments)
           }
       }
   })
}
function removeLike(id, stock){

   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
   db.once('value', function(snapshot) {
       var comments = snapshot.val()

       for (var key in comments) {
           if (comments[key].id == id) {
               comments[key].likes -= 1
               console.log("called")
               db.set(comments)
           }
       }
   })
}

function addDislike({id, stock}){
   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
   db.once('value', function(snapshot) {
       var comments = snapshot.val()

       for (var key in comments) {
           if (comments[key].id == id) {
               comments[key].dislikes += 1
         
               db.set(comments)
           }   
       }
   })
}

function removeDislike({id, stock}){

   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
   db.once('value', function(snapshot) {
       var comments = snapshot.val()

       for (var key in comments) {
           if (comments[key].id == id) {
               comments[key].dislikes -= 1
 
               db.set(comments)
           }
       }
   })
}





function getLike({id, stock}){
   
   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
   db.once('value', function(snapshot) {
       const comments = snapshot.val()
       for (var key in comments) {
           if (comments[key].id == id) {
               return comments[key].likes
           }
       }
   })
}

 function getDislike({id, stock}){
   const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
       const comments = snapshot.val();
        for (var key in comments) {
           if (comments[key].id == id) {
               return comments[key].dislikes
           }
       }
   })
}

if (comments.length == 0) {
    return <div style={{textAlign: "center"}}>No comments yet. <br/> Be the first to comment.</div>
}


const likestyles = {
    fontSize: "12px",
    color: "black",
    margin: "10px",
}


    return (
      <div>
        <div>
          
        </div>

          {!(comments === null || comments === undefined) ? 
          comments.map(comment => {
                 
               
                
                const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${sss}`)
                db.once('value', function(snapshot) {
                    const comments = snapshot.val()
         
                    for (var key in comments) {
                      
                        if (comments[key].id == comment.id) {
                            commentlikes = comments[key].likes
                            commentdislikes = comments[key].dislikes
                        }
                    }
                })
               
                return (
                    
              <Comment style ={commentStyle}
            /*
              actions={
                [
                    <span style={likestyles}>
                  <Tooltip key="comment-basic-like" title="Like">
                  <span onClick={()=>addLike({id: commentx, stock: sss})}>
                      {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                      <span className="comment-action"><p>Likes: {getLike({id:comment.id ,stock: sss})}</p></span>
                  </span>
                  </Tooltip>
                    </span>,
                    <span style={likestyles}>
                  <Tooltip key="comment-basic-dislike" title="Dislike">
                  <span onClick={()=> addDislike({id: comment.id, stock: sss})}>
                      {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                      <span className="comment-action"><p>DisLikes: {commentdislikes}</p></span>

                  </span>
                  </Tooltip>
                  </span>
                ]
              }
                */
              author={<a>{comment.author}</a>}
              content={
                <p>
                  {comment.comment} 
                </p>
              }
              datetime={
                <Tooltip title={moment(comment?.date).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(comment?.date).fromNow()}</span>
                </Tooltip>
              }
            />
            )
             
            })
            :
            <div> </div>
}
                


      </div>
    )
    

    
}

export default Comments;
