import { FiTrash2 } from 'react-icons/fi'
import Link from "next/link"
import styles from './../../styles/Home.module.css'
import { useNote } from "../../contexts/note"
import { useEffect } from "react"

export default function ListView() {
   var { summaryNotes, setSummaryNotes } = useNote()

   useEffect(() => {
   }, [summaryNotes])

   async function handleDeleteNote(id: string) {
      var response = await fetch(`/api/notes/${id}`, {
         method: 'DELETE'
      })

      if (response.status != 200) {
         alert('Erro ao deletar nota.')
      } else {
         setSummaryNotes(summaryNotes.filter(note => note.id !== id))
      }
   }

   return (
      <div>
         { summaryNotes.length > 0
            ? <p className='text-center text-danger-emphasis py-3'>
               There's no confirmation for delete note in this view. Double click to delete.
              </p>
            : null}
         
         <ul className="list-group list-group-flush">
            {summaryNotes.map(note => {
               return (
                  <li 
                     key={note.id}
                     className="list-group-item d-flex pb-0"
                  >
                     <div className='pt-2'>
                        <Link href={`/note/${note.id}`} className={styles.viewTitle}>
                           <h2 style={{width: "960px", overflowWrap: "break-word"}} className="fs-5">
                              {note.title} &rarr;
                           </h2>
                           <p className='fw-light'>{note.categories.join(', ')}</p>
                        </Link>
                     </div>

                     <button className={`btn ${styles.defaultHover}`} onDoubleClick={() => handleDeleteNote(note.id)}>
                        <FiTrash2 size="20" color="#dc3545" />
                     </button>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}