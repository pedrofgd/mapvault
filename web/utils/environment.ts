export function IsDevelopment() {
   var environment = process.env.NODE_ENV?.toString()!
   return new RegExp('development', 'gi').test(environment)
}