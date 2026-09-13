const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Make sure Metro watches the packages/ folder (important for monorepo setups)
config.watchFolders = [
  path.resolve(__dirname, "packages"),
  path.resolve(__dirname, "apps"),
];

// Ensure Metro resolves modules from the project root first
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

module.exports = config;
