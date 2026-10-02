import genlog from "./logger.js"

import express from "express";
import cors from "cors";
const PORT=5000;
const app=express();
app.use(cors());

app.get("/api/logs",(req,res)=>{
    const username=req.query.name || "Guest";   //took name for user for labeling the session. guest by default
    res.setHeader('Cache-Control', 'no-cache');//headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client
    console.log(`Username: ${username} setting up `);
    const intervalID=setInterval(()=>{      //setInterval returns an id. used later to clear it later and stop the log generation.
        const logData=genlog();
        const {type,timestamp,description}=logData;     
        res.write(`data:${type} ${timestamp} - ${description}\n\n`);   //"data:" prefix must
    }, 500);
    res.on('close',()=>{     // when user closes the tab or clicks stop ,close
        console.log(`Client:${username} stopped`);
        clearInterval(intervalID);
        res.end();
    });

    
});

app.listen(PORT,()=>{
    console.log(`App running successfuly in http:localhost:${PORT}`)
});