# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
1, 手动
npm run node #启动hardhat服务器
npm run start #编译
npm run deploy #部署

2, 半自动
npm run full # 启动并编译
npm run deploy
```

deploy后会生成一个方便部署使用的，保存了用户信息的文件`deployedAddresses`

使用`concurrently`和`wait-on`是做什么的？
```js
// 允许同时运行多个命令
"scripts": {
    // 没有 concurrently 时：只能一个个运行
    "dev": "npx hardhat node",
    "deploy": "npx hardhat run scripts/deploy.js",

    // 使用 concurrently：可以同时运行多个命令
    "full": "concurrently \"npm run dev\" \"npm run deploy\""
}
```

```js
// 等待特定条件满足后再执行命令
"scripts": {
    // 使用 wait-on 等待 8545 端口准备好
    "full": "concurrently \"npm run dev\" \"wait-on tcp:8545 && npm run deploy\""
}
```