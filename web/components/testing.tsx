import { useRouter } from "next/router"
import { useNote } from "../contexts/note";
import { generateTestData, deleteNotes } from "../utils/testing"

export default function Testing() {
   const route = useRouter()
   const { summaryNotes } = useNote();

   async function handleGenerateData() {
      await generateTestData()
      route.reload()
   }

   async function handleDeleteAllData() {
      await deleteNotes(summaryNotes)
      route.reload()
   }

   return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" role="button" 
               data-bs-toggle="dropdown" aria-expanded="false">
               Testing
            </a>
            <ul className="dropdown-menu" style={{fontSize: "15px"}}>
               <li><button className="dropdown-item" onClick={handleGenerateData}>Generate test data</button></li>
               <li><hr className="dropdown-divider" /></li>
               <li><button className="dropdown-item text-danger-emphasis" onClick={handleDeleteAllData}>Delete everything</button></li>
            </ul>
         </li>
      </ul>
   )
}