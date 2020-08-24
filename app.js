let express = require('express');
let firebase = require('firebase');
const path = require('path'); // 使用 path 套件來處理路徑問題
let app = express();
app.use(express.static('./public'));

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


app.get("/home",(req,res) => {
    
    pathname = path.join(__dirname, 'public');
    let options = {
        root: pathname,
        dotfiles: 'deny'
    }
    
    res.sendFile('home.html',options); //傳送任何檔案類型(只能傳一次)
})


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
        gender: req.query.gender,
        age: req.query.age
    });
    console.log("Add member !!");
    res.send("Add member success!");
})

app.get("/BookKeeping_frontend", (req, res) => {

    pathname = path.join(__dirname, 'public');
    // console.log(pathname);  // __dirname/public/example.html
    let options = {
        root: pathname,
        dotfiles: 'deny'
    }
    
    res.sendFile('bookKeeping.html',options); //傳送任何檔案類型(只能傳一次)


    // let html = '';
    // await db.collection('Account').get().then(data => {
    //     data.forEach(doc => {
    //         console.log(doc.data())
    //         html += `${html}<div>${doc.id}: name = ${doc.data().name} age = ${doc.data().age}</div>`;
    //     });
    // });
    // console.log(html)
    // res.send(html)
})

app.get("/BookKeeping_backend", async (req, res) => {
    let data = await db.collection('Account').get();
    accArr = []
    data.forEach((doc) => {
        accArr.push({
            id: doc.id,
            item: doc.data().item,
            account: doc.data().account,
            date: doc.data().date,
            location: doc.data().location,
            price: doc.data().price,
            category: doc.data().category
        })
    })
    res.render('bookKeeping', {
        acc: accArr
    })
})

app.get("/BookKeeping_backend/API/addAccount",async (req,res) => {

    console.log(req.query);
    let item = req.query.item;
    let account = req.query.account;
    let date = req.query.date;
    let loc = req.query.location;
    let price = req.query.price;
    let category = req.query.category;

    db.collection('Account').add({
        item: item,
        account: account,
        date: date,
        location: loc,
        price: price,
        category: category
    });

    // res.send(`Add Account: 
    //     ${item},
    //     ${account},
    //     ${date},
    //     ${loc},
    //     ${price},
    //     ${category}`);

    res.redirect("http://127.0.0.1:3000/BookKeeping_backend")

})


app.get("/BookKeeping_backend/API/deleteAccount",async(req,res) => {
    
    db.collection('Account').doc(req.query.id).delete();
    console.log(req.query.id);
    res.send(`delete account id = ${req.query.id}!`)

    res.redirect("http://127.0.0.1:3000/BookKeeping_backend")
    
})

app.get('*', (req, res) => {  
    res.send('No Content');  
});

let port = process.env.PORT || 3000;

// console.log("server running at port =",port);
// console.log(process.env);

app.listen(port, () => {
    console.log(`server listen on port =${port}`)
});