import { createContext, ReactNode, useContext, useState } from "react";

const EditorContext = createContext<IEditorContext>({} as IEditorContext);

export type Props = {
   children: ReactNode
}

interface IEditorContext {
   content: string,
   setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function EditorProvider(props: Props) {
   const { children } = props;
   const [content, setContent] = useState('')

   return (
      <EditorContext.Provider value={{
         content,
         setContent
      }}>
         {children}
      </EditorContext.Provider>
   )
}

export function useEditor() {
   const context = useContext(EditorContext);
   const { content, setContent } = context;
   return { content, setContent };
}