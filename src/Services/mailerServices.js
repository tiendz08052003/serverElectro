import nodemailer from 'nodemailer';

const sendMailServices = async (userMail, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.USER_NAME,
          pass: process.env.PASS_WORD
        }
      });

      const info = await transporter.sendMail({
        from: `"ELECTRO 👻"<${process.env.USER_NAME}>`, // sender address
        to: userMail, // list of receivers
        subject, // Subject line
        text: "Hello world?", // plain text body
        html, // html body
      });

      return info
}

export default sendMailServices;