export function IsTesting() {
   var environment = process.env.NEXT_PUBLIC_ENVIRONMENT?.toString()!
   return new RegExp('Testing', 'gi').test(environment)
}