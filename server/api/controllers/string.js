const { readDoc, saveDoc } = require("../libs/actionManager");

exports.delete = async function (req, res, next) {
  try {
    let string = readDoc("strings.json");
    let strings = JSON.parse(string);
    delete strings[req.params.string];
    saveDoc(`strings.json`, JSON.stringify(strings));
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
};
