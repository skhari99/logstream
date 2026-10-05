#  LogStream Pro 

A modern, real-time log-streaming dashboard built with React and Node.js/Express, featuring live Server-Sent Events (SSE), session labeling, client-side filtering, and automatic terminal scrolling.

## Features

### Core
* **Real-Time Log Streaming:** Stream live mock system logs from an Express backend to the React frontend using standard-compliant Server-Sent Events (`text/event-stream`).
* **Session Labeling & Management:** Assign custom names to label each session.
* **Dynamic Client-Side Filtering:** Filter incoming logs instantly by log levels without breaking or re-establishing the underlying socket pipe connection.

## Tech Stack

* **Frontend:**
  * React.js (Vite)
* **Backend:**
  * Node.js
  * Express.js
  * SSE Middleware

## Preview

* **Control Panel:** 
  * A simple toolbar with a session name input, a filter dropdown, and Start/Stop buttons.
* **Terminal Window:** 
  * A clean, dark-themed console that shows live, timestamped logs with custom scrollbars.

## Live demo 
* [Click to View](https://drive.google.com/file/d/1B8jT-4d2_1QmMOqsonS0Tm5e0Wx1FHxW/view?usp=sharing)

#
