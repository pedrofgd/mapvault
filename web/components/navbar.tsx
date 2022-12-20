import Link from "next/link";

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
               <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
               </form>
            </div>
         </div>
      </nav>
   )
}