const express = require("express");
const {
  createGroup,
  addMembers,
} = require("../controllers/collaborativeGroupController");

const router = express.Router();

router.post("/group", createGroup);
router.post("/group/:groupId", addMembers);

module.exports = router;
