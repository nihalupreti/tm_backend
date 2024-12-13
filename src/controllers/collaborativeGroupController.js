const sendSuccessResponse = require("../utils/reponse");
const Invitation = require("../models/Invitation");
const User = require("../models/User");
const Group = require("../models/CollaborativeGroup");
const ApiError = require("../utils/customError");
const InvitationEmail = require("../emails/InvitationEmail");

exports.createGroup = async (req, res, next) => {
  const { title } = req.body;
  try {
    const group = new Group({ title });
    const saveGroup = await group.save();

    sendSuccessResponse(res, 200, saveGroup, "Group created successfully");
  } catch (err) {
    next(err);
  }
};

exports.addMembers = async (req, res, next) => {
  const { from, to } = req.body; //to field holds email
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new ApiError(
        404,
        "Group doesn't exists",
        `Group with id ${groupId} doesn't exists in our record.`
      );
    }

    const userDetail = await User.findOne({ email: to });
    console.log(userDetail);

    if (group.users.includes(userDetail._id)) {
      throw new ApiError(
        409,
        "User already exists",
        "This user is already part of this group."
      );
    }
    const invite = new Invitation({
      groupId,
      from,
      to: userDetail._id,
      status: "pending",
    });

    const saveInvite = await invite.save();
    await new InvitationEmail({
      recipientName: userDetail.fullName,
      recipientEmail: userDetail.email,
      inviterName: "placeholder",
      groupName: group.title,
      invitationLink: `http://localhost:3000/invite/${groupId}`,
    }).sendEmail();

    sendSuccessResponse(res, 200, "", "Invitation send sucessfully");
  } catch (err) {
    next(err);
  }
};
