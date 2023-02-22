import Link from "next/link"
import { NoteResume } from "../../interfaces"
import styles from '../../styles/Home.module.css'

type Props = {
   data: NoteResume[]
}

const CardsView: React.FC<Props> = ({ data }) => {
   return (
      <div className={styles.grid}>
         {data.map((note) => {
            return (
               <Link key={note.id} href="/note/[id]" as={`/note/${note.id}`} 
                  className={styles.card}>
                  {/* Titulo */}
                  <h2 className={styles.titleWrap}>
                  {note.title} &rarr;
                  </h2>
                  {/* Descricao */}
                  <div style={{height: "60px"}}>
                  <p className={styles.textWrap}>
                     {note.exceptionMessage
                        ? note.exceptionMessage
                        : note.description}
                  </p>
                  </div>
                  {/* Categorias */}
                  <div className={`${styles.overflowRowWithoutScrollBar} mt-2`}>
                  {note.categories?.map((category) => {
                     return (
                        <span key={category} className="badge text-bg-dark p-2 m-1">
                        {category}
                        </span>
                     )
                  })}
               </div>
            </Link>
         )
         })}
      </div>
   )
}

export default CardsView