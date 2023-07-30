var nodemailer = require("nodemailer");

module.exports.sendMailFun = (subject, html) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedbehiery96@gmail.com",
      pass: "mvhyhbxlldvmmoyq",
    },
  });

  var mailOptions = {
    from: "ahmedbehiery96@gmail.com",
    to: "ahmedbehiery96@gmail.com",
    subject,
    // text: ``,
    html,
  };

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, "error");
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
