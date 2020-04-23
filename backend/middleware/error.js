module.exports = function (err, req, res, next) {
  //logger
  console.log('Error:', err.message);

  res.status(500).send('Sometnig failed');
};
