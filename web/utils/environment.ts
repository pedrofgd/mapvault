export function IsDevelopment() {
   var environment = process.env.NODE_ENV?.toString()!
   return new RegExp('development', 'gi').test(environment)
}

export function GetShortEnvironmentName() {
   var environment = process.env.NODE_ENV
   switch (environment) {
      case 'development':
         return 'dev'
   
      case 'production':
         return 'prod'

      default:
         return environment
   }
}