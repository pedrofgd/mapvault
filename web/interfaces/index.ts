export type NoteResume = {
   id: string
   title: string,
   categories: string[],
   exceptionMessage: string
}

export type Note = {
   id: string
   title: string,
   categories: string[],
   exceptionMessage: string,
   content: string
}