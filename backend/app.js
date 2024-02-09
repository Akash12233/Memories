import express from 'express';
const app=express();

app.get('/', (req, res) => {
    // Send "Hello World" as the response
    res.send('Memories Backend');
  });
export {app};