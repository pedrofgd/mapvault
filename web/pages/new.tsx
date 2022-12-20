import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import Editor from '../components/editor'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import RecentVaults from '../components/recentVaults'
import Tags from '../components/tags'
import { useEditor } from '../contexts/editor'
import styles from '../styles/Home.module.css'

export default function New() {
   var router = useRouter()

   const [title, setTitle] = useState('')
   const [categories, setCategories] = useState('')
   const [exceptionMessage, setExceptionMessage] = useState('')
   const { content, setContent } = useEditor()

   useEffect(() => {
      // Reset conteudo
      setContent('')
   }, [])

   const handleCreateNew = async(e: FormEvent) => {
      e.preventDefault();
   
      var categoriesArray = categories.split(", ")
      var body = JSON.stringify({
         title,
         categories: categoriesArray,
         exceptionMessage,
         content
      })

      var response = await fetch('/api/notes/create', {
         method: 'POST',
         body
      })

      if (response.status == 200) {
         alert('Nota criada com sucesso.')
         router.push('/')
      }
   }

   return (
      <>
         <div className={styles.container}>
            <Navbar />

            <main>
               <div className="container-lg my-5" style={{minHeight: "70vh"}}>
                  <div className="row align-items-start">
                     {/*  */}
                     <div className="col-1">
                     </div>

                     {/* Formulario */}
                     <form className="col-7 bg-light border rounded-3 p-4" 
                           onSubmit={handleCreateNew}>
                        {/* Cabecalho */}
                        <div className='d-flex align-items-center mb-2'>
                           {/* Botao Sair */}
                           <Link href="/" className='pt-2'>
                              <button className="btn-close" type="button"></button>
                           </Link>

                           <h2 className="my-0 ps-3">Criar novo</h2>
                        </div>

                        {/* Titulo input */}
                        <div className="form-floating my-3">
                           <input 
                              type="text" className="form-control" id="floatingInput"
                              onChange={(e) => setTitle(e.target.value)} />
                           <label htmlFor="floatingInput">Titulo</label>
                        </div>

                        {/* Categorias input */}
                        <div className="form-floating my-3">
                           <input 
                              type="text" className="form-control" id="floatingInput"
                              onChange={(e) => setCategories(e.target.value)} />
                           <label htmlFor="floatingInput">Categorias</label>
                        </div>

                        {/* ExceptionMessage input */}
                        <div className="form-floating my-3">
                           <input 
                              type="text" className="form-control" id="floatingInput"
                              onChange={(e) => setExceptionMessage(e.target.value)} />
                           <label htmlFor="floatingInput">Exception message (opcional)</label>
                        </div>

                        <Editor />

                        {/* Butão "Criar" */}
                        <div className="d-grid gap-2 mt-4">
                           <button 
                              className="btn btn-success" 
                              type="submit">Criar</button>
                        </div>
                     </form>

                     {/* Coluna direita */}
                     <div className="col ps-5">
                        <Tags />
                        <RecentVaults />
                     </div>
                  </div>
               </div>
            </main>

            <Footer />
         </div>
      </>
   )
}