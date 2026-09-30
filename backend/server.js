import genlog from "./logger.js"

import express from "express";
import cors from "cors";
const PORT=5000;
const app=express();
app.use(cors());

app.get("/api/logs",(req,res)=>{
    res.setHeader('Cache-Control', 'no-cache');//headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client
    console.log("Setting up ");
    const intervalID=setInterval(()=>{
        const logData=genlog();
        const {type,timestamp,description}=logData;
        res.write(`${type} ${timestamp} - ${description}\n\n`);
    }, 500);
    res.on('close',()=>{
        console.log("Client closed the tab");
        clearInterval(intervalID);
        res.end();
    });

    
});

app.listen(PORT,()=>{
    console.log(`App running successfuly in http:localhost:${PORT}`)
});