const info = obj => {
  console.log("\nINFO: ", obj);
};

const error = obj => {
  console.log("\n.....ERROR ===> ", obj);
};

module.exports = {
  info,
  error
};
