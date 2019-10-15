
let express = require('express');

let app = express();
let result =0;
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next()
});

let answerData=[
    {
        "id":1,
        "answer":"dsd"
    },
    {
        "id":2,
        "answer":"sdfs"
    },
    {
        "id":3,
        "answer":"sdfs"
    },
    {
        "id":4,
        "answer":"sdfs"
    }
];

let Data = [
    {
        "id":1,
        "question": "Sample question?",
        "option1":"dsd",
        "option2":"sdsd",
        "option3":"ssd",
        "option4":"kjsd"
    },
    {
        "id":2,
        "question": "affs",
        "option1":"dsd",
        "option2":"sdsd",
        "option3":"ssd",
        "option4":"kjsd"
    },
    {
        "id":3,
        "question": "affs",
        "option1":"dsd",
        "option2":"sdsd",
        "option3":"ssd",
        "option4":"kjsd"
    },
    {
        "id":4,
        "question": "affs",
        "option1":"dsd",
        "option2":"sdsd",
        "option3":"ssd",
        "option4":"kjsd"
    }
];

app.get('/',(req,res)=>res.send("Server is running!!!"));

app.get('/loadQuestions',(req,res)=>{
    let id = req.query.id;
    if(req.query.id>Data.length){
        res.send("No question found here")
    }else{
        res.send(Data[id-1]);
    }
});

app.get('/checkAnswer',(req,res)=>{
    let id = req.query.id;
    var ans = req.query.option;
    var actualAnswer = answerData[id-1].answer.toString();
    if(ans==actualAnswer){
        result = result+2;
        res.json({"response":true,
                "result" : result});
    }else{ 
        result = result-2;
        res.json({"response":false,
                    "result":result});
    }
});

app.listen(port,()=>console.log(`Server listening on port ${port}`));
