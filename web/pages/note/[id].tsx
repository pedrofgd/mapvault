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
                  <h1>{data.title}</h1>
                  <h4>{data.exceptionMessage}</h4>
                  {data.categories?.map((category) => {
                     return (
                        <span key={category} className="badge text-bg-dark p-2 m-1">
                           {category}
                        </span>
                     )
                  })}

                  <div className="quill my-4">
                     <div className="ql-snow">
                        <div className="ql-editor">
                           {content}
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
