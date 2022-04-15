import { useAuthState } from "react-firebase-hooks/auth";
import { dbs } from "../firebase/firebase-config";

// add ratings to the database 
/*
export const inititateRate = (stock) => {
   
    const db = dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/`)
    db.once('value', function(snapshot) {
        const ratings = snapshot.val()
        console.log(ratings)
        if (ratings == undefined || ratings == null) {
            dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/`).update({
                [stock]: {
                    email: "aaronskins@gmail.com",
                    rating: 5,
                }
            })
        }
        else {
            if (ratings[stock] == undefined) {
                dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/`).update({
                    [stock]: [{
                        email: "aaronskins@gmail.com",
                        rating: 5,
                    }]
                })
            }
            else {
                console.log("already rated")
            }
        }
    })


    
    

}*/



export const addStockRating = async ({stock, rating, email}) => {
    console.log(rating)
    var ch = 0
    const db = dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`)
    // check if stock is found
    db.once('value', function(snapshot) {
        var x = snapshot.val()
        if (x == undefined || x == null) {
            //not found 
            // add to the database
            dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`).push({
                rating: rating,
                email: email,
            })
        }
        // if it is found loop through the ratings and check if the email is already rated
        else {
            var ratings = snapshot.val()
            var nratings = Object.values(ratings)
            var xratings = Object.keys(ratings)
            console.log(nratings)
            var check = 0
            console.log("here")
            for (var i = 0; i < nratings.length; i++) {
                console.log("ratings[i].email")
                console.log(nratings[i].email)
                console.log(email)
                if (nratings[i].email == email) {

                    console.log("EMAIL")
                    console.log(i)
                    dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}/${xratings[i]}`).remove()
                }
            }
            if (check == 0) {
                dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`).push({
                    rating: rating,
                    email: email,
                })
            }
            window.location.reload()
        }
        
    })
}

export const getStockRating =(stock) => {
    const db = dbs.ref(`Ratings/-N-5tjvQZKnNf7ZVTHkR/${stock}`)
    db.once('value', function(snapshot) {
        var ratings = snapshot.val()

        console.log(ratings)
        var sum = 0
        var count = 0
        for (var key in ratings) {
            sum += ratings[key].rating
            count += 1
        }
        console.log(sum)
        console.log(count)
        var avg = sum/count
        console.log(avg)
        return avg
    })
}

