
export function FormatDateTimeToString(date: Date): string {
   let dateAtLocalTime = new Date(date.toLocaleString(
      "pt-BR", 
      {timeZone: "America/Sao_Paulo"}
      ))
      
   const months = ["janeiro", "fevereiro", "março", "abril", "maio", 
            "junho", "julho", "agosto", "setembro", "outubro", 
            "novembro", "dezembro"]

   // return dateAtLocalTime.toString()

   let day = dateAtLocalTime.getDate()
   let year = dateAtLocalTime.getFullYear()
   let month = dateAtLocalTime.getMonth()
   let hour = dateAtLocalTime.getHours()
   let minutes = dateAtLocalTime.getMinutes()

   // example: 19 dezembro 2022
   return `${day} ${months[month]} ${year} às ${hour}h${minutes}`
}
