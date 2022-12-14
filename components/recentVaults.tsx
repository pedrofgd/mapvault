export default function RecentVaults() {
   return (
      <div className="mt-5">
         <div className="my-2">
            <span><b>Últimos criados</b></span>
         </div>

         <div style={{fontSize: "14px"}}>
            <ul className="list-group list-group-flush">
               <li className="list-group-item ps-0 d-flex justify-content-between align-items-start">
                  <span style={{width: "220px", overflowWrap: "break-word"}}>
                     A list item for test a long text fit in the layout...
                  </span>
                  <span className="badge bg-warning rounded-pill">14/10/22</span>
               </li>
               <li className="list-group-item ps-0 d-flex justify-content-between align-items-start">
                  <span style={{width: "220px", overflowWrap: "break-word"}}>
                     A second list item for test a long text fit in the layout...
                  </span>
                  <span className="badge bg-warning rounded-pill">10/12/22</span>
               </li>
               <li className="list-group-item ps-0 d-flex justify-content-between align-items-start">
                  <span style={{width: "220px", overflowWrap: "break-word"}}>
                     A third list item for test a long text fit in the layout...
                  </span>
                  <span className="badge bg-warning rounded-pill">01/11/22</span>
               </li>
               <li className="list-group-item ps-0 d-flex justify-content-between align-items-start">
                  <span style={{width: "220px", overflowWrap: "break-word"}}>
                     A third list item for test a long text fit in the layout...
                  </span>
                  <span className="badge bg-warning rounded-pill">01/11/22</span>
               </li>
               <li className="list-group-item ps-0 d-flex justify-content-between align-items-start">
                  <span style={{width: "220px", overflowWrap: "break-word"}}>
                     A third list item for test a long text fit in the layout...
                  </span>
                  <span className="badge bg-warning rounded-pill">01/11/22</span>
               </li>
            </ul>
         </div>
      </div>
   )
}