module.exports = function (err, req, res, next) {
  //logger
  console.log(err);

  res.status(500).send('Sometnig failed');
};
