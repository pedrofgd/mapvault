import { useRouter } from "next/router"
import { Note } from "../../interfaces"
import useSwr from 'swr'
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function NotePage() {
   const router = useRouter()

   const { data, error } = useSwr<Note>(`/api/notes/${router.query.id}`, fetcher)

   if (error) return <div>Failed to load users</div>
   if (!data) return <div>Loading...</div>

   var parse = require('html-react-parser')
   var content = parse (data.content)

   return (
      <div className={styles.container}>
         <Navbar />

         <main className="container-lg my-5" style={{minHeight: "70vh"}}>
            <div className="row">
               <div className="col-8">
                  <h1 style={{width: "100%", overflowWrap: "break-word"}}>{data.title}</h1>
                  <h4>{data.exceptionMessage}</h4>
                  {data.categories?.map((category) => {
                     return (
                        <span key={category} className="badge text-bg-dark p-2 m-1">
                           {category}
                        </span>
                     )
                  })}

                  <div className="card mt-4">
                     <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                           <div className="fw-light">
                              <span className="text-muted">última modificação: {` `}</span>
                              <span>19 dezembro 2022</span>

                           </div>
                           <div className="dropdown">
                           <button className="btn btn-sm btn-outline-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              ...
                           </button>
                           <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="#">Editar</a></li>
                           </ul>
                           </div>
                        </div>
                     </div>

                     <div className="card-body py-0">
                        <div className="quill my-4">
                           <div className="ql-snow">
                              <div className="ql-editor">
                                 {content}
                              </div>
                           </div>
                        </div>
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
