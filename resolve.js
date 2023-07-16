const path = require("path");

module.exports = {
  alias: {
    hooks: path.resolve(__dirname, "./src/hooks"),
    utils: path.resolve(__dirname, "./src/utils"),
    components: path.resolve(__dirname, "./src/components"),
    common: path.resolve(__dirname, "./src/common"),
    anticons: "@ant-design/icons",
  },
};
