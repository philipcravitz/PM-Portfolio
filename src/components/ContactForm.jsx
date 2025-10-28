import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState("idle")

  function handleSubmit(e) {
    e.preventDefault()
    setStatus("submitted")
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:'400px'}}>
      <label>
        Name
        <input type="text" required style={{width:'100%',marginBottom:'1em'}} />
      </label>
      <label>
        Email
        <input type="email" required style={{width:'100%',marginBottom:'1em'}} />
      </label>
      <label>
        Message
        <textarea required style={{width:'100%',marginBottom:'1em'}} />
      </label>
      <button type="submit" style={{padding:'0.5em 2em'}}>Send</button>
      {status === "submitted" && <div style={{marginTop:'1em', color:'green'}}>Message sent! (demo only)</div>}
      <div style={{marginTop:'1em'}}>
        Or email me: <a href="mailto:philip.cravitz@gmail.com">philipcravitz@gmail.com</a><br />
        Or connect on <a href="https://www.linkedin.com/in/philip-cravitz/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </form>
  )
}