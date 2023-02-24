import styles from '../styles/CodeBlock.module.css'

type Props = {
   message: string
}

const ExceptionMsgAccordion: React.FC<Props> = ({ message }) => {
   return (
      <div className="accordion accordion-flush" id="accordionExample">
         <div className="accordion-item">
            
            <h2 className="accordion-header" id="headingOne">
               <button className="accordion-button fs-5 fw-light px-0" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  style={{backgroundColor: '#FFF', color: '#000', boxShadow: 'none'}}>
                  Exception message
               </button>
            </h2>

            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
               <pre className={`accordion-body fw-light ${styles.codeblock}`}
                  style={{whiteSpace: 'pre-line'}}>
                  <code>
                     {message}
                  </code>
               </pre>
            </div>

         </div>
      </div>
   )
}

export default ExceptionMsgAccordion