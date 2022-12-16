export type ApiResponseDto = {
   notes: Note[],
   count: Number
}

export type Note = {
   id: string
   title: string,
   categories: string[],
   exceptionMessage: string
}