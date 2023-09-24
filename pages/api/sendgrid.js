import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const body = req.body;

  const selectMessage = {
    subscribe: `<div>$Имейл: ${body.from}</div><br/>`,

    order: `<div>$Име: ${body.name}</div><br/>
    <div>$Имейл: ${body.from}</div><br/>
    <div>$Телефонен номер: ${body.phone}</div><br/>
    <div>${body.message}</div>`,
  };

  try {
    await sendgrid.send({
      to: "threeoyka@gmail.com", // Your email where you'll receive emails
      from: "threeoyka@gmail.com", // your website email address here
      subject: `${body.subject}`,
      html: selectMessage[body.type ?? "order"],
    });

    res.send(200).json({ success: "Request send!" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
