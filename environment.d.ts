declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_STRAPI_API_TOKEN:string
      NEXT_STRIPE_PK_TEST:string
      NEXT_STRIPE_PK_LIVE:string
      NEXT_STRIPE_SK_TEST:string
      NEXT_PUBLIC_API_URL:string
      NEXT_PUBLIC_EMAIL_API_URL:string
      SENDGRID_API_KEY:string
      SPEEDY_API_URL:string
      IS_RELEASED:string
      EMAIL_TEMPLATE_ID_EN:string
      EMAIL_TEMPLATE_ID_IT:string
      EMAIL_TEMPLATE_ID_BG:string
    }
  }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}