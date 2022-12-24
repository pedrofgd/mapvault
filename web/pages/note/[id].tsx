import { useRouter } from "next/router"
import { Note } from "../../interfaces"
import useSwr from 'swr'
import styles from '../../styles/Home.module.css'
import Editor from "../../components/editor"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { useEffect, useState } from "react"
import { useEditor } from "../../contexts/editor"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NotePage() {
   const router = useRouter()

   const { content, setContent } = useEditor()
   const [editToogle, setEditToogle] = useState(false)
   const [editTitleToogle, setEditTitleToogle] = useState(false)
   const [editExMessageToogle, setEditExMessageToogle] = useState(false)
   const [editCategoriesToogle, setEditCategoriesToogle] = useState(false)

   const { data, error } = useSwr<Note>(`/api/notes/${router.query.id}`, fetcher)

   useEffect(() => {
      if (data)
         setContent(data.content)
   }, [data])

   if (error) return <div>Failed to load users</div>
   if (!data) return <div>Loading...</div>

   function handleEditToogle() {
      setEditToogle(!editToogle)
   }

   async function handleUpdateNote() {
      var body = JSON.stringify({
         id: data?.id,
         title: data?.title,
         categories: data?.categories,
         exceptionMessage: data?.exceptionMessage,
         content: content
      })
      
      var response = await fetch('/api/notes/update', {
         method: 'PUT',
         body
      })
      if (response.status == 200) {
         alert('Nota editada com sucesso.');
         handleEditToogle();
      }
   }

   function ViewNoteBlock(content: string) {
      var parse = require('html-react-parser')
   
      return (
         <div className="card-body py-3">
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
         <div className="pb-3">
            <div className="px-3 pt-3">
               <Editor defaultContent={content} />
            </div>
            <hr />
            <div className="d-flex justify-content-end pe-3">
               <button type="button" className="me-2 btn btn-outline-secondary btn-sm"
                  onClick={handleEditToogle}>Cancel</button>
               <button type="button" className="btn btn-success btn-sm"
                  onClick={handleUpdateNote}>Success</button>
            </div>
         </div>
      )
   }

   function handleEditTitleToogle() {
      setEditTitleToogle(!editTitleToogle)
   }

   function handleEditExMessageToogle() {
      setEditExMessageToogle(!editExMessageToogle)
   }

   function handleEditCategoriesToogle() {
      setEditCategoriesToogle(!editCategoriesToogle)
   }

   function EditTextInput(label: string, content: string, handler: () => void) {
      return(
         <div className="form-floating my-3">
            <input 
               type="text" className="form-control" id="floatingInput"
               onChange={(e) => {console.log(e.target.value)}}
               value={content} />
            <label htmlFor="floatingInput">{label}</label>
         </div>
      )
   }

   function EditingButtonsBlock() {
      return (
         <div className="d-flex align-items-center justify-content-between">
            <span style={{fontWeight: 'bold'}}>Editando...</span>

            {/* Botoes */}
            <div className="d-flex justify-content-end mt-2">
               <button type="button" className="me-2 btn btn-outline-secondary btn-sm"
                  onClick={() => {
                     setEditTitleToogle(false);
                     setEditExMessageToogle(false);
                     setEditCategoriesToogle(false);
                  }}>Cancelar tudo</button>
               <button type="button" className="btn btn-success btn-sm"
                  onClick={() => {
                     setEditTitleToogle(false);
                     setEditExMessageToogle(false);
                     setEditCategoriesToogle(false);
                  }}>Salvar tudo</button>
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
                  {editTitleToogle || editExMessageToogle || editCategoriesToogle
                     ? EditingButtonsBlock()
                     : null
                  }

                  {/* Titulo */}
                  {editTitleToogle == true 
                     ? EditTextInput('Editando o Título', data.title, handleEditTitleToogle)
                     : <h1 style={{width: "100%", overflowWrap: "break-word", cursor: "pointer"}}
                           onDoubleClick={handleEditTitleToogle}>{data.title}</h1>
                  }

                  {/* Exception message */}
                  {editExMessageToogle == true
                     ? EditTextInput('Editando Exception Message', data.exceptionMessage, handleEditExMessageToogle)
                     : <h4 className="fw-light" style={{cursor: "pointer"}}
                           onDoubleClick={handleEditExMessageToogle}>{data.exceptionMessage}</h4>
                  }

                  {/* Categorias */}
                  {editCategoriesToogle
                     ? EditTextInput('Editando Categorias', data.categories.join(', '), handleEditCategoriesToogle)
                     : data.categories?.map((category) => {
                        return (
                           <span key={category} style={{cursor: 'pointer'}}
                              className="badge text-bg-dark p-2 m-1"
                              onDoubleClick={handleEditCategoriesToogle}>
                              {category}
                           </span>
                        )
                     })
                  }

                  {editTitleToogle || editExMessageToogle || editCategoriesToogle
                     ? <hr />
                     : null
                  }

                  <div className="card mt-4">
                      <div className="card-header py-1">
                        <div className="d-flex justify-content-between align-items-center">
                           <div className="fw-light" style={{fontSize: "14px"}}>
                              {editToogle == true
                                 ? <span className="fw-bold">Editando</span>
                                 :
                                 (<div>
                                    <span className="text-muted">última modificação: {` `}</span>
                                    <span>19 dezembro 2022</span>
                                 </div>)
                              }
                              
                           </div>
                           <div className="dropdown">
                           <button className="btn btn-sm" type="button" 
                              data-bs-toggle="dropdown" aria-expanded="false">
                              ...
                           </button>
                           <ul className="dropdown-menu" style={{fontSize: "15px"}}>
                              <li><button className="dropdown-item" onClick={handleEditToogle}>Editar</button></li>
                              <li><hr className="dropdown-divider"/></li>
                              <li><h6 className="dropdown-header">Ações na nota</h6></li>
                              <li><button className="dropdown-item text-danger" onClick={handleDeleteNote}>Deletar tudo</button></li>
                           </ul>
                           </div>
                        </div>
                     </div>

                     <div>
                        {editToogle == true 
                           ? EditorBlock(data.content)
                           : ViewNoteBlock(data.content) }
                     </div>
                  </div>
               </div>

               {/* Coluna direita */}
               <div className="col ms-3 mt-2">
                  
               </div>
            </div>
         </main>

         <Footer />
      </div>
   )
}