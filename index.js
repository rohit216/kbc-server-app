
let express = require('express');
let cors = require('cors');

let app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:8100',
    'http://localhost:8101',
    'http://localhost:*',
    'http://192.168.1.126:8100',
    'http://192.168.1.109:8101',
    'KbcApplication@8101',
    'https://kbc-quiz.herokuapp.com/'
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by cors origin'));
      }
    }
  }

  app.options('*', cors(corsOptions));

let answerData=[
    {
        "id":1,
        "answer":"Leo Tolstoy"
    },
    {
        "id":2,
        "answer":"Gennie"
    },
    {
        "id":3,
        "answer":"Windows"
    },
    {
        "id":4,
        "answer":"wreslting"
    },
    {
        "id":5,
        "answer":"sam manekshaw"
    }
];

let Data = [
    {
        "id":1,
        "question": "Who is the author of 'war and peace'?",
        "option1":"W Shakespeare",
        "option2":"Charles Dickens",
        "option3":"Leo Tolstoy",
        "option4":"Sakshi Shalini"
    },
    {
        "id":2,
        "question": "Harry Potter ends up marrying?",
        "option1":"hermione",
        "option2":"Ron",
        "option3":"Gennie",
        "option4":"Snape"
    },
    {
        "id":3,
        "question": "Which of these is a operating system?",
        "option1":"Doors",
        "option2":"Portico",
        "option3":"Gates",
        "option4":"Windows"
    },
    {
        "id":4,
        "question": "which game is played in indra gandhi complex?",
        "option1":"cricket",
        "option2":"football",
        "option3":"wreslting",
        "option4":"boxing"
    },
    {
        "id":5,
        "question": "first field marshal india?",
        "option1":"sam manekshaw",
        "option2":"k m cariappa",
        "option3":"pv naik",
        "option4":"v k singh"
    }
];

app.get('/', cors(corsOptions),(req,res)=>res.send("Server is running!!!"));

app.get('/loadQuestions',cors(corsOptions),(req,res)=>{
    let id = req.query.id;
    if(req.query.id>Data.length){
        res.json({"testEnded":true})
    }else{
        res.send(Data[id-1]);
    }
});

app.get('/checkAnswer',cors(corsOptions),(req,res)=>{
    let id = req.query.id;
    var ans = req.query.option;
    var actualAnswer = answerData[id-1].answer.toString();
    if(ans==actualAnswer){
        res.json({"response":true});
    }else{ 
        res.json({"response":false});
    }
});

app.listen(port,()=>console.log(`Server listening on port ${port}`));
