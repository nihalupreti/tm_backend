const BaseEmail = require("./BaseEmail");

class InvitationEmail extends BaseEmail {
  constructor({
    recipientName,
    recipientEmail,
    inviterName,
    groupName,
    invitationLink,
  }) {
    super();
    this.name = "SEND_INVITATION_EMAIL";
    this.invitationData = {
      recipientName,
      recipientEmail,
      inviterName,
      groupName,
      invitationLink,
    };
  }

  async getNodeMailerPayload() {
    const {
      recipientName,
      recipientEmail,
      inviterName,
      groupName,
      invitationLink,
    } = this.invitationData;

    return {
      to: `${recipientName} <${recipientEmail}>`,
      from: `"TMS" <${process.env.EMAIL}>`,
      subject: `You’ve been invited${
        groupName ? ` to join ${groupName}` : ""
      }!`,
      text: `Hello ${recipientName},
      
      ${inviterName} has invited you${
        groupName ? ` to join the group ${groupName}` : ""
      }.
      Click the link below to accept the invitation:
      ${invitationLink}
      
      Best regards,
      TMS`,
    };
  }
}

module.exports = InvitationEmail;
