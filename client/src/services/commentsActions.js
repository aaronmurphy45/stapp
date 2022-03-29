
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, dbs} from '../firebase/firebase-config';
import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';


const likes = 0;
const dislikes = 0;
const action = null

const addComment = async (comment, email, stock) => {
   // add comment to database
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    console.log(db)
        db.once('value', function(snapshot) {
            if (snapshot.val() == null) {
                db.push({
                    comment: comment,
                    email: email,
                    likes: 0,
                    dislikes: 0
                })
                window.location.reload()
            }
            else {
                console.log(db)
                console.log(snapshot.val())
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
                window.location.reload()
            }

        })
    
}


const addLike = (id, stock) => {
    console.log(stock)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        var comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                comments[key].likes += 1
                console.log("called")
                db.set(comments)
                window.location.reload()
            }
        }
    })
}
const removeLike = ({id, stock}) => {
    console.log(stock)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        var comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                comments[key].likes -= 1
                console.log("called")
                db.set(comments)
                window.location.reload()
            }
        }
    })
}

const addDislike = ({id, stock}) => {
    console.log(stock)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        var comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                comments[key].dislikes += 1
                console.log("called")
                db.set(comments)
                window.location.reload()
            }   
        }
    })
}

const removeDislike = ({id, stock}) => {
    console.log(stock)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        var comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                comments[key].dislikes -= 1
                console.log("called")
                db.set(comments)
                window.location.reload()
            }
        }
    })
}





const getLike = ({id, stock}) => {
    console.log(stock)
    console.log(id)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        const comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                
                return comments[key].likes
            }
        }
    })
}

const getDislike = ({id, stock}) => {
    console.log(stock)
    console.log(id)
    const db = dbs.ref(`Comments/-MytAFz50QIeqIL1QLaf/${stock}`)
    db.once('value', function(snapshot) {
        const comments = snapshot.val()
        console.log(comments)
        for (var key in comments) {
            if (comments[key].id == id) {
                return comments[key].dislikes
            }
        }
    })
}






export { addComment, addLike, removeLike, getDislike, getLike, addDislike, removeDislike };