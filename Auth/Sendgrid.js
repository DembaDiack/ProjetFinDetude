const sendgrid = require('@sendgrid/mail');
const sendgrid_api_key = "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";

exports.sendMail = (from,to,subject,text,html) => {
    sendgrid.setApiKey(sendgrid_api_key);
    const msg = {
        to: to,
        from: from,
        subject: subject,
        text: text,
        html: html
      };

      return sendgrid.send(msg);
}