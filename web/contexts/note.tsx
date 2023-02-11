import { createContext, ReactNode, useContext, useState } from "react";
import { NoteResume } from '../interfaces'

const NoteContext = createContext<INoteContext>({} as INoteContext);

export type Props = {
   children: ReactNode
}

interface INoteContext {
   summaryNotes: NoteResume[],
   setSummaryNotes: React.Dispatch<React.SetStateAction<NoteResume[]>>
}

export default function NoteProvider(props: Props) {
   const { children } = props;
   const [summaryNotes, setSummaryNotes] = useState<NoteResume[]>([])

   return (
      <NoteContext.Provider value={{
         summaryNotes,
         setSummaryNotes
      }}>
         {children}
      </NoteContext.Provider>
   )
}

export function useNote() {
   const context = useContext(NoteContext);
   const { summaryNotes, setSummaryNotes } = context;
   return { summaryNotes, setSummaryNotes };
}