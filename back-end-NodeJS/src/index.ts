import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import Poetry from './services/Poetry'

const app = express();

app.use(cors())
app.use(express.json())

function logRequests(request: Request, response: Response, next: NextFunction) {
  const { method, url } = request;
  
  const logLabel = `[${method.toUpperCase} ${url}]`;

  console.time(logLabel);

  next(); // Próximo middleware

  console.timeEnd(logLabel);
}

 app.use(logRequests)

app.get('/daily', (req, res)=>{
  Poetry.get('random').then(data=>{
    res.json(data.data)
  })
})
//GET all author from poetry
app.get('/authors', (req, res)=>{
  Poetry.get('author').then(response=>{
    res.json(response.data)
  })
})
//GET all titles of a specific author from poetry
app.post('/author', (req, res)=>{

  const{author}=req.body
  console.log(req.body);
  
  
  Poetry.get('author/'+author+'/title').then(response=>{
    res.json(response.data)
  })
})

app.post('/title', (req, res)=>{
  const{title}=req.body

  Poetry.get('title/'+title).then(response=>{
    res.json(response.data)
  })
})


app.listen(3333, () => {
    console.log('Pikachu, i choose you!')
  });
  