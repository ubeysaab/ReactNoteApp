
import './App.css'
import Split from 'react-split'
import Editor from './Components/Editor'
import Sidebar from './Components/Sidebar'
import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'



// TODO     * Challenge:
// //** 1. Every time the `notes` array changes, save it
// *    in localStorage. You'll need to use JSON.stringify()
// *    to turn the array into a string to save in localStorage.
// * cause everty time is gonna reach the local storage we will use useEffect


// * 2. When the app first loads, initialize the notes state
// *    with the notes saved in localStorage. You'll need to
// *    use JSON.parse() to turn the stringified array back
// *    into a real JS array.
// */

// Challenge 2:
// * Lazily initialize our `notes` state so it doesn't
// * reach into localStorage on every single re-render
// * of the App component

// challenge 3
// * move   modified notes to the top of the list

// challenge 4
//* delete Notes












function App() {
  
  const [notes, setNotes] = useState(()=>
  // lazy state initializing so it doesn't
// reach into localStorage on every single re-render
//  of the App component
    JSON.parse(localStorage.getItem("notes"))||[]
  )
  const [currentNoteId,setCurrentNoteId] = useState(notes[0]&&notes[0].id ||"")

  useEffect(()=>{
      localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])









  const createNewNote = () => { 
    const newNote = {
      id:nanoid(),
      text:"create a new note using our new editor"
    }
    setNotes(prev =>{
       return [newNote,...prev]
    })
    // todo: When we Create a new note the current noteId should match its id
    setCurrentNoteId(newNote.id)
   }

function findCurrentNote() {
  // we use this because it return an object that we'll use
  const result = notes.find((item)=> {
    return item.id === currentNoteId
  })
  console.log(result)
  return result
}


function updateNote(metin){


  // is just update
  // let result = notes.map(item => {
  //   return item.id===currentNoteId ? {...item,text:metin}: item
  // })


  // code that move the modified note to the top
  let result = [];
  for(let i =0;i<notes.length;i++){
    let note = notes[i]

    if(note.id===currentNoteId)
    {
      result.unshift({...note,text:metin})
    }
    else {
      result.push(note)
    }

  }


  setNotes(result)
}

// https://www.freecodecamp.org/news/a-simplified-explanation-of-event-propagation-in-javascript-f9de7961a06e/
function handleDelete(event,noteId){
event.stopPropagation()
let result = notes.filter(item=> item.id!==noteId)
setNotes(result)

}





  return (
    <>
    <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[35, 65 ]} 
                direction="horizontal"
                // cursor='col-resizer' 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    //todo when we pass the () the fucntion will work immediately
                    currentNote={findCurrentNote()}
                    delete={handleDelete}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    </>
  )
}

export default App
