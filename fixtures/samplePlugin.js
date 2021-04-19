module.exports = (data) => {
  return function cssModules(tree) {
    data.resourceId = tree.options.rollupResourceId;
  };
};
