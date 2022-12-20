import { useRouter } from "next/router"
import { Note } from "../../interfaces"
import useSwr from 'swr'
import styles from '../../styles/Home.module.css'
import Editor from "../../components/editor"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { useState } from "react"
import { useEditor } from "../../contexts/editor"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NotePage() {
   const router = useRouter()

   const { content, setContent } = useEditor()
   const [editToogle, setEditToogle] = useState(false)

   function handleEditToogle() {
      setEditToogle(!editToogle)
   }

   function handleEditNote() {
      console.log("ok")
      console.log(content)
   }

   const { data, error } = useSwr<Note>(`/api/notes/${router.query.id}`, fetcher)

   if (error) return <div>Failed to load users</div>
   if (!data) return <div>Loading...</div>

   setContent(data.content)

   function ViewNoteBlock(content: string) {
      var parse = require('html-react-parser')
   
      return (
         <div className="card-body py-0">
            <div className="quill">
               <div className="ql-snow">
                  <div className="ql-editor">
                     {parse(content)}
                  </div>
               </div>
            </div>
         </div>
      )
   }

   function EditorBlock(content: string) {
      return (
         <div className="px-3">
            <Editor defaultContent={content} />
            <div className="d-flex justify-content-end mt-2">
               <button type="button" className="me-2 btn btn-outline-secondary btn-sm"
                  onClick={handleEditToogle}>Cancel</button>
               <button type="button" className="btn btn-success btn-sm"
                  onClick={handleEditNote}>Success</button>
            </div>
         </div>
      )
   }

   async function handleDeleteNote() {
      var response = await fetch(`/api/notes/${data?.id}`, {
         method: 'DELETE'
      })

      if (response.status != 200) {
         alert('Erro ao deletar nota.')
      } else {
         router.push('/')
      }
   }

   return (
      <div className={styles.container}>
         <Navbar />

         <main className="container-lg my-5" style={{minHeight: "70vh"}}>
            <div className="row">
               <div className="col-8">
                  <h1 style={{width: "100%", overflowWrap: "break-word"}}>{data.title}</h1>
                  <h4 className="fw-light">{data.exceptionMessage}</h4>
                  {data.categories?.map((category) => {
                     return (
                        <span key={category} className="badge text-bg-dark p-2 m-1">
                           {category}
                        </span>
                     )
                  })}

                  <div>
                     <div className="pt-2">
                        <div className="d-flex justify-content-between align-items-center">
                           <div className="fw-light" style={{fontSize: "14px"}}>
                              <span className="text-muted">última modificação: {` `}</span>
                              <span>19 dezembro 2022</span>

                           </div>
                           <div className="dropdown">
                           <button className="btn" type="button" 
                              data-bs-toggle="dropdown" aria-expanded="false">
                              ...
                           </button>
                           <ul className="dropdown-menu">
                              <li><button className="dropdown-item" onClick={handleEditToogle}>Editar</button></li>
                              <li><hr className="dropdown-divider"/></li>
                              <li><h6 className="dropdown-header">Ações na nota</h6></li>
                              <li><button className="dropdown-item text-danger" onClick={handleDeleteNote}>Deletar tudo</button></li>
                           </ul>
                           </div>
                        </div>
                     </div>

                     <hr />

                     <div style={{marginLeft: "-14px"}}>
                        {editToogle == true 
                           ? EditorBlock(data.content)
                           : ViewNoteBlock(data.content) }
                     </div>
                  </div>
               </div>

               <div className="col ms-3 mt-2">
                  Histórico de modificações
               </div>
            </div>
         </main>

         <Footer />
      </div>
   )
}