const uuidv4 = require("uuid/v4");
const { addList, getListById, updateList, deleteList } = require("../../db");

module.exports.validateList = (req, res, next) => {
  req.checkBody("name", "You must supply a list name!").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json(errors);
  }

  next();
};

module.exports.addList = async (req, res) => {
  const { name } = req.body;
  const id = uuidv4();
  const user_id = req.user.id;
  const list = await addList({ id, user_id, name });
  res.json(list);
};

module.exports.getList = async (req, res, next) => {
  const list = await getListById(req.params.id);
  if (!list) {
    return res.json(`No list found with id ${req.params.id}`);
  }
  req.list = list;
  next();
};

module.exports.updateList = async (req, res) => {
  const newList = { ...req.list, ...req.body };
  const list = await updateList(req.params.id, newList);
  if (!list) {
    return res.json(`No list found with id ${req.params.id}`);
  }
  req.list = list;
  next();
};

module.exports.deleteList = async (req, res) => {
  await deleteList(req.params.id);
  res.json(`List named "${req.list.name}" deleted`);
};

module.exports.sendList = (req, res) => {
  res.json(req.list);
};
