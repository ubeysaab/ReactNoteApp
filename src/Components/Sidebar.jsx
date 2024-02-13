import React from 'react'
import { MdDelete } from "react-icons/md";

function Sidebar(props) {

  let noteElements = props.notes.map((item,i)=>{
    return (
      <div key={item.id}  className={item.id === props.currentNote.id ? "selected-note note":"note"} 
      onClick={()=>props.setCurrentNoteId(item.id)}>
        
         <h4> {item.text.match('[^\n]*')}</h4>
        
           <MdDelete style={{color:"#777"}} onClick={(event)=>props.delete(event,item.id)}/>
         
      </div>
    )
  })


  return (
    <section className="pane sidebar">
    <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>+</button>
    </div>
    {noteElements}
</section>
  )
}

export default Sidebar