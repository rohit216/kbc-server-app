
let express = require('express');
let cors = require('cors');

let app = express();
let result =0;
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'https://kbc-quiz.herokuapp.com/'
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    }
  }

  app.options('*', cors(corsOptions));

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

app.get('/', cors(corsOptions),(req,res)=>res.send("Server is running!!!"));

app.get('/loadQuestions',cors(corsOptions),(req,res)=>{
    let id = req.query.id;
    if(req.query.id>Data.length){
        res.send("No question found here")
    }else{
        res.send(Data[id-1]);
    }
});

app.get('/checkAnswer',cors(corsOptions),(req,res)=>{
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
