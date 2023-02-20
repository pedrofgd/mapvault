import { createContext, ReactNode, useContext, useState } from "react";

const ViewContext = createContext<IViewContext>({} as IViewContext);

export type Props = {
   children: ReactNode
}

interface IViewContext {
   view: string,
   setView: React.Dispatch<React.SetStateAction<string>>,
   viewsAvailable: string[],
   setViewsAvailable: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ViewProvider(props: Props) {
   const { children } = props;
   const [viewsAvailable, setViewsAvailable] = useState(['Card', 'List'])
   const [view, setView] = useState(viewsAvailable[0])

   return (
      <ViewContext.Provider value={{
         view,
         setView,
         viewsAvailable,
         setViewsAvailable
      }}>
         {children}
      </ViewContext.Provider>
   )
}

export function useView() {
   const context = useContext(ViewContext);
   const { view, setView, viewsAvailable, setViewsAvailable } = context;
   return { view, setView, viewsAvailable, setViewsAvailable };
}