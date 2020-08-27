// let firebase = require('firebase')
// let express = require('express')
// let app = express();

// // Your web app's Firebase configuration
// var firebaseConfig = {
// apiKey: "AIzaSyDit0eTpo8qPNecLNkientINF8ymA-vINk",
// authDomain: "jimchu-nodejs-02.firebaseapp.com",
// databaseURL: "https://jimchu-nodejs-02.firebaseio.com",
// projectId: "jimchu-nodejs-02",
// storageBucket: "jimchu-nodejs-02.appspot.com",
// messagingSenderId: "913726356571",
// appId: "1:913726356571:web:18f100936bb5e48141937e",
// measurementId: "G-EQWT29RZ7Q"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // firebase.analytics();

// let db = firebase.firestore();

// app.set('view engine', 'ejs');
// app.get('/', async (req, res) => {
//     let data = await db.collection("ClassA").get();
//     // console.log(data)
//     let userArr = [];
//     data.docs.forEach((doc) => {
//         userArr.push(doc.data().name);
//     })
//     console.log(userArr);
//     res.render("default", {
//         users: userArr,
//         // users: ["Alice", "Bob", "Fisheep", "Fiona"],
//         title: "This is root page!"
//     })
// })
// app.listen(3000, () => {
//     console.log("render_test server is running at http://127.0.0.1:3000")
// })