const emailService = require("../services/email.service");

exports.sendMailRegisterUser = async (user, password, url) => {
  return emailService.sendEmail({
    user,
    subject: "Bienvenido a Feria Virtual",
    archive: "registerUser",
    data: { confirmUrl: url, email: user.email, password, name: user.name },
  });
};
