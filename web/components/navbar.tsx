import Link from "next/link";
import { useState } from "react";
import { useView } from "../contexts/view";
import Search from "./search";

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
                  </Link>

                  <span className="nav-link" 
                     style={{cursor: 'pointer'}}
                     onClick={() => setView(
                        viewsAvailable[indexNextView])}>
                        {viewsAvailable[indexNextView]} View
                  </span>
               </ul>
            </div>

            <div className="col-6">
               <Search />
            </div>

            <div className="col">
            </div>
         </div>
      </nav>
   )
}