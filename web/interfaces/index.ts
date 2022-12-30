export type NoteResume = {
   id: string
   title: string,
   categories: string[],
   exceptionMessage: string
}

export type Note = {
   id: string
   title: string,
   createdAt: Date| null,
   modifiedAt: Date | null,
   categories: string[],
   exceptionMessage: string,
   content: string
}