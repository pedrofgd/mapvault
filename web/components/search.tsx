import { FormEvent } from "react"
import { useState } from "react"
import { useNote } from "../contexts/note"
import { NoteResume } from "../interfaces"
import styles from '../styles/Home.module.css'

export default function Search() {
   const { summaryNotes } = useNote() 
   const [ query, setQuery ] = useState('')
   const [ queryResults, setQueryResults ] = useState<NoteResume[]>([])

   function getQuery(e: FormEvent) {
      e.preventDefault()
      var regex = new RegExp(query, 'gi');
      setQueryResults(summaryNotes.filter(x => x.title.match(regex)))
   }

   return (
      <>
         <form className="d-flex" role="search" onChange={(e) => getQuery(e)}>
            <div className="dropdown me-2">
               <input 
                  className="form-control dropdown-toggle"
                  data-bs-toggle="dropdown" aria-expanded="false"
                  type="search"
                  placeholder="Search" 
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
               />
               <ul className="dropdown-menu mt-2">
                  <li><h6 className="dropdown-header">Notas</h6></li>
                  {queryResults.length > 0 
                     ? queryResults.slice(0, 4).map(result => (
                        <li><a className={`dropdown-item ${styles.searchResultWrap}`} href={`/note/${result.id}`}>{result.title}</a></li>
                     ))
                     : <li><a className="dropdown-item disabled">Nada encontrado</a></li>}
               </ul>
            </div>
            <button className="btn btn-outline-success" type="submit">Search</button>
         </form>
      </>
   )
}