let express = require('express');
let firebase = require('firebase')
const port = process.env.PORT || 3000;
console.log("server running at port =",port);

var firebaseConfig = {
apiKey: "AIzaSyDit0eTpo8qPNecLNkientINF8ymA-vINk",
authDomain: "jimchu-nodejs-02.firebaseapp.com",
databaseURL: "https://jimchu-nodejs-02.firebaseio.com",
projectId: "jimchu-nodejs-02",
storageBucket: "jimchu-nodejs-02.appspot.com",
messagingSenderId: "913726356571",
appId: "1:913726356571:web:18f100936bb5e48141937e",
measurementId: "G-EQWT29RZ7Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');  
app.get('/', async (req, res) => {  
    let data = await db.collection('ClassA').get();
    let userArr = []
    data.forEach((doc) => {
        console.log(doc.data().name)
        userArr.push(doc.data().name);
    })
    res.render('default', {  
        title: '首頁',  
        // users: ['Fisheep', 'Fiona', 'Alice', 'Bob']
        users: userArr
    });  
});

app.get("/jim", async (req, res) => {
    let data = await db.collection('ClassA').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender
        })
    })
    res.render('classA', {
        users: userArr
    })
})

app.get("/firebase-test", async (req, res) => {
    let html = '';
    let data = await db.collection('ClassA').get();
    data.forEach(doc => {
        console.log(doc.data());
        html += `<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    });
    res.send(html)
})

app.get("/ClassA_backend", async (req, res) => {
    let data = await db.collection('ClassA').get();
    userArr = []
    data.forEach((doc) => {
        userArr.push({
            id: doc.id,
            name: doc.data().name,
            age: doc.data().age,
            gender: doc.data().gender
        })
    })
    res.render('ClassA', {
        users: userArr
    })
})

app.get("/ClassA_frontend", (req, res) => {
    let options = {
        root:  __dirname+"/public",
        dotfiles: 'ignore'
    }
    console.log(__dirname+"/public");
    res.sendFile("/ClassA.html", options);
})

app.get('/who/:name', (req, res) => {  
    var name = req.params.name;  
    res.send(`This is ${name}`);  
});

app.get('/API/deleteMember', (req, res) => {
    db.collection('ClassA').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete Member id = ${req.query.id}!`)
})

app.get('/API/addMember', (req, res) => {
    db.collection('ClassA').add({
        name: req.query.name,
        gender: req.query.age,
        age: req.query.gender
    });
    console.log("Add member !!");
    res.send("Add member success!");
})

app.get('*', (req, res) => {  
    res.send('No Content');  
});

app.listen(port, () => {
    console.log(`server listen on port =${port}`)
});