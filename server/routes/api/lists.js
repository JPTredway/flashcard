const { Router } = require("express");
const { isLoggedIn, isListOwner } = require("../../controllers/authController");
const {
  validateList,
  addList,
  getList,
  updateList,
  deleteList,
  sendList
} = require("../../controllers/listController");

const router = Router();
router.post("/lists", isLoggedIn, validateList, addList);

router
  .route("/lists/:id")
  .get(isLoggedIn, getList, sendList)
  .put(isLoggedIn, validateList, getList, isListOwner, updateList, sendList)
  .delete(isLoggedIn, getList, isListOwner, deleteList);

module.exports = { lists: router };
