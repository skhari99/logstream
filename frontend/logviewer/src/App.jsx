import { useState, useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [logs,setLogs]=useState([]);
  
  const [isRunning,setIsRunning]=useState(false);//to check if logs are already being fired

  const [eventSource,setEventSource]=useState(null);//state to manage eventsource
  
  const [name,setName]=useState('');//state to store the name after input
  
  const [tempName,setTempName]=useState('');//state to store the name while typing
  
  const [selectValue,setSelectValue]=useState(["All"]);//array to store the log types to be displayed

  //state for custom logs
  const [customlog,setCustomlog]=useState("");

 
  // const scrollRef = useRef(null);
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [logs]);
  const handleSelect=(event)=>{   // function to handle multi selection 
    const values=Array.from(event.target.selectedOptions).map((tempvalue)=>{// takes the values in selectedOptions, make an array of them and get the actual values by mapping through array
      return tempvalue.value;
    });
    setSelectValue(values);
  }

  const startRunning=((userName)=>{   //function that activates firing logs(start button)
    if(isRunning){
      return;
    }
    const url=`http://localhost:5000/api/logs?name=${encodeURIComponent(userName)}` //passing username through query params
    setIsRunning(true);
    const evntsrc=new EventSource(url);
    setEventSource(evntsrc);
    evntsrc.onmessage=(e)=>{
      console.log(e.data);
      const newlog=e.data;
      const firstword=newlog.trim().split(/\s+/)[0];
      if(firstword==="" || (!selectValue.includes("All") && !selectValue.includes(firstword))){//checks if either first word is empty or it doesnt belongs to selectValue
        return;
      }

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

   //handle custom log injection 
  const handleLogInjection=(event)=>{
    event.preventDefault();//to prevent page from refreshing
    if(customlog!=""){
      
      setLogs((prevLogs)=>{
        return [customlog,...prevLogs];
      })
      setCustomlog("");
      
    }
  }
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
      <h1 className='Head'><b>Logstream</b></h1>
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
        <div className='Logtype'>
          <label>Select the log type:</label>
          <select multiple={true} value={selectValue} onChange={handleSelect} className="select-dropdown">
            <option value="All">All</option>
            <option value="INFO">INFO</option>
            <option value="ERROR">ERROR</option>
            <option value="WARN">WARN</option>
          </select>
          <p>Selected values: {selectValue.join(", ")}</p>
        </div>
        <div className="buttons">
          <button onClick={()=>{startRunning(name)}}>
            Start Stream
          </button>
          <button onClick={stopRunning}>Stop Stream</button>
        </div>
      </div>
      <div className='terminal-window'>
        {logs.length === 0 ? (
          <p >Click Start Stream </p>
        ) : (
          logs.map((logLine, index) => (
            <div key={index} className='log-line'>
              {logLine}
            </div>
          ))
        )}
        {/* <div ref={scrollRef} /> */}
      </div>
      <div className="custom-log-div">
        <label>Input log string:</label>
        <form className='custom-log' onSubmit={handleLogInjection}>
          <input type="text" value={customlog} placeholder="Enter log" onChange={(e)=>{setCustomlog(e.target.value)}}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    
  )
}

export default App
