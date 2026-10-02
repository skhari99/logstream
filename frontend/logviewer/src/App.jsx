import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [logs,setLogs]=useState([]);
  const [isRunning,setIsRunning]=useState(false);//to check if logs are already being fired
  const [eventSource,setEventSource]=useState(null);
  const [name,setName]=useState('');
  const [tempName,setTempName]=useState('');

  const startRunning=((userName)=>{
    if(isRunning){
      return;
    }
    setLogs([]);
    const url=`http://localhost:5000/api/logs?name=${encodeURIComponent(userName)}`
    setIsRunning(true);
    const evntsrc=new EventSource(url);
    setEventSource(evntsrc);
    evntsrc.onmessage=(e)=>{
      console.log(e.data);
      const newlog=e.data;
      setLogs((prevLogs)=>{
        return [newlog,...prevLogs];
      })
    };
    evntsrc.onerror=(err)=>{
      console.error("Error:",err);
      evntsrc.close();
      setIsRunning(false);
    };
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(tempName.trim()!=''){
      setTempName(tempName.trim());
      setName(tempName);
      startRunning(tempName);
    }

  };
  
  const stopRunning=(()=>{
    if(eventSource){
      eventSource.close();
      setEventSource(null);
      setIsRunning(false);
    }
    
  });
  useEffect(()=>{
    return ()=>{
      if(eventSource){
        eventSource.close();
      }
    }
  },[eventSource]);
  return (
    <div className='app-container'>
      <div className='control-panel'>
        {(name==='')?(
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your name" value={tempName} onChange={(e)=>{setTempName(e.target.value)}}  />
            <button type="submit">Submit</button>
          </form>):
          (
            <div>
              User: {name}
            </div>
          )
        }
        <div className="buttons">
          <button onClick={()=>{startRunning(name)}}>
            Start
          </button>
          <button onClick={stopRunning}>Stop</button>
        </div>
      </div>
      <div className='terminal-window'>
        {logs.length === 0 ? (
          <p >Click start </p>
        ) : (
          logs.map((logLine, index) => (
            <div key={index} className='log-line'>
              {logLine}
            </div>
          ))
        )}
      </div>
    </div>
    
  )
}

export default App
