export type NoteResume = {
   id: string
   title: string,
   categories: string[],
   description: string,
   exceptionMessage: string
}

export type Note = {
   id: string
   title: string,
   createdAt: Date | null,
   modifiedAt: Date | null,
   categories: string[],
   description: string,
   exceptionMessage: ExceptionMessage,
   content: string
}

type ExceptionMessage = {
   message: string,
   valuables: string[]
}