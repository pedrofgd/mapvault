type Props = {
   modalId: string
   modalTitle: string
   modalBody: string
   leftButtonText: string
   leftButtonClasses: string
   leftButtonOnClickAction: () => Promise<void> | undefined
   rightButtonText: string
   rightButtonClasses: string
   rightButtonOnClickAction: () => Promise<void> | undefined
}

const Modal: React.FC<Props> = (props) => {
   return (
      <div className="modal fade" id={props.modalId} tabIndex={-1} aria-labelledby="confirmToDeleteNoteModalLabel" aria-hidden="true">
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h1 className="modal-title fs-5" id="confirmToDeleteNoteModalLabel">
                     {props.modalTitle}
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>

               <div className="modal-body">
                  {props.modalBody}
               </div>

               <div className="modal-footer">
                  <button 
                     type="button" 
                     className={props.leftButtonClasses} 
                     onClick={props.leftButtonOnClickAction}
                     data-bs-dismiss="modal">
                        {props.leftButtonText}
                  </button>

                  <button 
                     type="button" 
                     className={props.rightButtonClasses} 
                     onClick={props.rightButtonOnClickAction} 
                     data-bs-dismiss="modal">
                        {props.rightButtonText}
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Modal