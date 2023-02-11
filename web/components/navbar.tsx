import Link from "next/link";
import Search from "./search";

export default function Navbar() {
   return (
      <nav className="navbar navbar-expand-lg shadow-sm p-3">
         <div className="container-fluid">
            <div className="col">
               <Link href="/" className="navbar-brand text-secondary">
                  MapVault
               </Link>
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