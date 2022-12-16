import Link from 'next/link'
import Editor from '../components/editor'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import RecentVaults from '../components/recentVaults'
import Tags from '../components/tags'
import styles from '../styles/Home.module.css'

export default function New() {
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

                     {/*  */}
                     <div className="col-7 bg-light border rounded-3 p-4">
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
                           <input type="text" className="form-control" id="floatingInput" />
                           <label htmlFor="floatingInput">Titulo</label>
                        </div>

                        {/* Categorias input */}
                        <div className="form-floating my-3">
                           <input type="text" className="form-control" id="floatingInput" />
                           <label htmlFor="floatingInput">Categorias</label>
                        </div>

                        {/* ExceptionMessage input */}
                        <div className="form-floating my-3">
                           <input type="text" className="form-control" id="floatingInput" />
                           <label htmlFor="floatingInput">Exception message (opcional)</label>
                        </div>

                        <Editor />

                        {/* Butão "Criar" */}
                        <div className="d-grid gap-2 mt-4">
                           <button className="btn btn-success" type="button">Criar</button>
                        </div>
                     </div>

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