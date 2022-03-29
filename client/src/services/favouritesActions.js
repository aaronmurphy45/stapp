import {React  } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, dbs} from '../firebase/firebase-config';

import { useGetStockSparkQuery, useGetStocksTrendingQuery } from './yahooRecommmend';
var favsx;

const addFavourites = (newvalue, uid) => {
   
    const db = dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}`)
        console.log(db)
    var favs;
        //dbs.ref(`Users`).push(obj)

       
        db.once('value', function(snapshot) {
            console.log(snapshot)
            try {
                favs = snapshot.val().favourites
            if (favs == undefined || favs == null) {
                dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`).update([newvalue])
                }
                else {
                    if (favs.length == 1 && favs[0] == 'EMPTY') {
                        favs.pop()
                        favs.push(newvalue)
                    }
                    else {
                        if (favs.includes(newvalue)) {
                            alert("Already in favourites")
                        }
                        else {
                            favs.push(newvalue)
                        }
                    }
                    console.log(favs)
                    dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`).update(favs)

                }
            }
            catch(err) {
                dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}`).update({favourites : [newvalue]})
                console.log(err)

            }

        })
        window.location.reload()
            
    }

    const deleteFavourites = (uid, symbol) => {
        const searchTerm = symbol
        const db = dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`)
        db.once('value', function(snapshot) {
            const favs = snapshot.val()
            console.log(favs)
            if (favs == undefined || favs == null || (favs.length == 0 && favs[0] == 'EMPTY')) {
                alert("No favourites to delete")
            }
            else {
                    if (favs.includes(searchTerm)) {
                        favs.splice(favs.indexOf(searchTerm), 1)
                        window.location.reload()
                    }
                    else {
                        alert("Not in favourites")
                    }
                }
                if (favs.length == 0) {
                    favs.push('EMPTY')
                }
                dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`).set(favs)
            
        })
        getFavourites()
        // refresh the page
       
       
       
    }



    const getFavourites = (uid) => {
        
        const db = dbs.ref(`Users/-MxJXOWOc4gpZU10vKMb/${uid}/favourites`)
        db.once('value', function(snapshot) {
            const favs = snapshot.val()
            console.log(snapshot)
            console.log(favs)
            if (favs == undefined || favs == null || (favs.length == 0 && favs[0] == 'EMPTY')) {
                 console.log("No favourites")
            }
            else {
                favsx = favs
                console.log("this: "+ favsx)
                return favsx
            }
        })
    }




export {addFavourites, deleteFavourites, getFavourites, favsx} ;