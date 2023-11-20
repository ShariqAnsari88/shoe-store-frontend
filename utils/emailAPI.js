import axios from 'axios'

import { EMAIL_API_URL } from './urls'

const headers = {
  'Content-Type': 'application/json'
}

const API = axios.create({
  baseURL: EMAIL_API_URL,
  headers
})

export const sendContactEmail = async (payload) => {
  if (payload.type) {
    const { type, locale, email } = payload

    const res = await API.post('/api/sendgrid', {
      locale,
      type,
      email,
      subject: 'Абонамент'
    })

    return res
  
  } else {
    const { subject, name, email, message, phone } = payload

    const res = await API.post('/api/sendgrid', {
      subject,
      email,
      message,
      name,
      phone
    })
    
    return res
  }
}
