import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const selectTemplate = {
  IT: process.env.EMAIL_TEMPLATE_ID_IT,
  EN: process.env.EMAIL_TEMPLATE_ID_EN,
  BG: process.env.EMAIL_TEMPLATE_ID_BG
}

export default async function handler(req, res) {
  const body = req.body

  if (body.type) {
    const { locale, email } = body

    const localeUpperCased = locale.toUpperCase()

    try {
      await sendgrid.send({
        to: email, // Your email where you'll receive emails
        from: 'info.troyka@gmail.com', // your website email address here
        templateId: selectTemplate[localeUpperCased]
      })

      res.status(200).json({ success: 'Request send!' })
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message })
    }
  } else {
    const { email, subject, name, message, phone } = body
    try {
      await sendgrid.send({
        text: `Имейл на потребителя: ${email}; $Име:${name}; Съобщение:${message} Телефонен номер:${
          phone ?? '[Празно]'
        }`,
        subject,
        to: 'pilyovmartin20@gmail.com', // Your email where you'll receive emails
        from: 'info.troyka@gmail.com' // your website email address here
      })

      res.status(200).json({ success: 'Request send!' })
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message })
    }
  }
}