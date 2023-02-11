import Link from "next/link";
import Search from "./search";

export default function Navbar() {
   return (
      <nav className="navbar navbar-expand-lg bg-body shadow-sm p-3">
         <div className="container-fluid">
            {/* Logo */}
            <Link href="/" className="navbar-brand text-secondary">
               MapVault
            </Link>

            <div className="collapse navbar-collapse">
               {/* Items */}
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <a className="nav-link" 
                        aria-current="page" 
                        href="#">Gerenciar</a>
                  </li>
               </ul>

               {/* Pesquisa */}
               <Search />
            </div>
         </div>
      </nav>
   )
}