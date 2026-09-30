



export default function genlog(){
    const typearr = ["INFO", "WARN","ERROR"];
    const randomtype=typearr[Math.floor(Math.random()*typearr.length)];
    const infotype=["Dashboard session successfully initialized.",
        "Database connection benchmark: stable (ping 4ms).",
        "Re-indexing background cache elements...",
        "User authentication token refreshed.",
        "Scheduled maintenance task completed.",
        "API request rate limit reset.",
        "Background job queue processed successfully.",
        "Configuration file updated and reloaded."];
    const warntype=["High system memory allocation detected: 84% usage.",
        "Disk space running low: 15% available.",
        "Unexpected spike in API request latency: 320ms.",
        "User session timeout threshold exceeded for multiple users.",
        "Database query execution time exceeded expected limits.",
        "Background job queue length exceeds recommended threshold.",
        "Configuration file validation failed: missing required fields."
    ];
    const errortype=["Database connection failed: timeout after 5000ms.",
        "API request failed: 503 Service Unavailable.",
        "User authentication failed: invalid credentials provided.",
        "File upload failed: unsupported file format.",
        "API network request to `/api/v1/users` failed with status 500.",
        "Background job processing failed: unexpected error occurred."
    ];
    const randominfo=infotype[Math.floor(Math.random()*infotype.length)];
    const randomwarn=warntype[Math.floor(Math.random()*warntype.length)];
    const randomerror=errortype[Math.floor(Math.random()*errortype.length)];
    let description;
    if(randomtype=="INFO"){
        description=randominfo;
    }
    else if(randomtype=="WARN"){
        description=randomwarn;
    }
    else{
        description=randomerror;
    }
    const now=new Date();
    const hh=now.getHours().toString().padStart(2,'0');
    const mm=now.getMinutes().toString().padStart(2,'0');
    const ss=now.getSeconds().toString().padStart(2,'0');
    const mmm=now.getMilliseconds().toString().padStart(3,'0');
    const timestamp=`${hh}:${mm}:${ss}.${mmm}`;
    return {
        type: randomtype,
        timestamp: timestamp,
        description: description
    }
}

