import styles from '../styles/CodeBlock.module.css'

type Props = {
   label: string
   message: string,
   valuable: string[]
}

function highlightValuable(content: string, valuables: string[]) {
   var parse = require('html-react-parser')

   for (let index = 0; index < valuables.length; index++) {
      const element = valuables[index];
      content = content.replace(element, `<strong style="background-color:#FFFF54" class="shadow-sm">${element}</strong>`);
   }
   
   return parse(content)
}

const ExceptionMsgAccordion: React.FC<Props> = ({ label, message, valuables }) => {
   return (
      <div className="accordion accordion-flush" id="accordionExample">
         <div className="accordion-item">
            
            <h2 className="accordion-header" id="headingOne">
               <button className="accordion-button fs-5 fw-light px-0" type="button" data-bs-toggle="collapse" 
                  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  style={{backgroundColor: '#FFF', color: '#000', boxShadow: 'none'}}>
                  {label}
               </button>
            </h2>

            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
               <pre className={`accordion-body fw-light ${styles.codeblock}`}
                  style={{whiteSpace: 'pre-line'}}>
                  <code>
                     {highlightValuable(message, valuables)}
                  </code>
               </pre>
            </div>

         </div>
      </div>
   )
}

export default ExceptionMsgAccordion