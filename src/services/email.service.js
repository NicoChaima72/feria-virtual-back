const nodemailer = require("nodemailer");
const ejs = require("ejs");
const juice = require("juice");
const { htmlToText } = require("html-to-text");

const emailConfig = require("../config/email.config");

const generateHTML = async (options) => {
  let html = new Promise((resolve, reject) => {
    const archive = `${__dirname}/../emails/${options.archive}.ejs`;

    ejs.renderFile(archive, { ...options.data }, {}, (err, str) => {
      if (err) reject(err);

      resolve(str);
    });
  });

  html = await html;

  return juice(html);
};

const transporter = nodemailer.createTransport(emailConfig);

exports.sendEmail = async (options) => {
  const html = await generateHTML(options);
  const htmlString = htmlToText(html);

  const mailOptions = {
    from: '"Feria Virtual" <noreply@feriavirtual.com>',
    to: options.user.email,
    subject: `Feria Virtual - ${options.subject}`,
    text: htmlString,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);

      return resolve(true);
    });
  });
};
