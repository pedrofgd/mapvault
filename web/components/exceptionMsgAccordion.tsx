import styles from '../styles/CodeBlock.module.css'

type Props = {
   label: string
   message: string
}

const valuable = [
   "MongoDB.Bson.BsonSerializationException: No matching creator found.",
   "ChooseBestCreator(Dictionary`2 values)",
   "DeserializeClass(BsonDeserializationContext context)",
   "ExecuteAsync(RetryableReadContext context, CancellationToken cancellationToken)",
   "RepositoryBase`1.GetByIdAsync(Guid id, CancellationToken cancellationToken) in /Users/pedrodias/dev/mapvault/api/src/Repositories/RepositoryBase.cs:line 21",
]

function highlightValuable(content: string) {
   var parse = require('html-react-parser')

   for (let index = 0; index < valuable.length; index++) {
      const element = valuable[index];
      content = content.replace(element, `<strong style="background-color:#FFFF54" class="shadow-sm">${element}</strong>`);
   }
   
   return parse(content)
}

const ExceptionMsgAccordion: React.FC<Props> = ({ label, message }) => {
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
                     {highlightValuable(message)}
                  </code>
               </pre>
            </div>

         </div>
      </div>
   )
}

export default ExceptionMsgAccordion