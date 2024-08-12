// scripts/update-version.js
const fs = require('fs');
const path = require('path');

const versionFilePath = path.resolve(__dirname, '../public/version.json');
const packageJsonPath = path.resolve(__dirname, '../package.json');

// 读取 package.json
const packageJson = require(packageJsonPath);

// 读取当前的 version.json
let versionJson = { version: '1.0.0' };
if (fs.existsSync(versionFilePath)) {
  versionJson = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
}

// 使用 package.json 中的版本号
versionJson.version = packageJson.version;

// 写入更新后的 version.json
fs.writeFileSync(versionFilePath, JSON.stringify(versionJson, null, 2));

console.log(`Updated version.json to version ${versionJson.version}`);