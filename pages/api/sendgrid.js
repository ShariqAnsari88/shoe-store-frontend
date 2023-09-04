import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  try {
    await sendgrid.send({
      to: "pilyovmartin20@gmail.com", // Your email where you'll receive emails
      from: "threeoyka@gmail.com", // your website email address here
      subject: `${body.subject}`,
      html: `
      <div>$Име: ${body.name}</div><br/>
      <div>$Имейл: ${body.from}</div><br/>
      <div>$Телефонен номер: ${body.phone}</div><br/>
      <div>${body.message}</div>`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

}
