import Link from "next/link";
import { useView } from "../contexts/view";
import { GetShortEnvironmentName, IsDevelopment } from "../utils/environment";
import { capitalizeFirstLetter } from "../utils/string";
import Search from "./search";
import Testing from "./testing";
import gradients from '../styles/Gradients.module.css'

export default function Navbar() {
   const { viewsAvailable, view, setView } = useView();
   let indexCurrentView = viewsAvailable.indexOf(view);
   let indexNextView = (indexCurrentView + 1) % viewsAvailable.length;

   return (
      <nav className="navbar navbar-expand-lg shadow-sm p-3">
         <div className="container-fluid">
            <div className="col">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <Link href="/" className="navbar-brand text-secondary">
                     MapVault
                     <span className={`ps-1 ${gradients.blue_gradient} fs-6`}> 
                        {capitalizeFirstLetter(GetShortEnvironmentName())}
                     </span>
                  </Link>

                  <span className="nav-link" 
                     style={{cursor: 'pointer'}}
                     onClick={() => setView(
                        viewsAvailable[indexNextView])}>
                        {viewsAvailable[indexNextView]} View
                  </span>
               </ul>
            </div>

            <div className="col-6 px-4">
               <Search />
            </div>

            <div className="col d-flex align-items-center">
               {IsDevelopment() ? <Testing /> : null}
               
               <Link href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string}/api/login`}>
                  Login
               </Link>
            </div>
            
         </div>
      </nav>
   )
}