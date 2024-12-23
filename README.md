# Web3 项目

> Professional README documentation to facilitate future collaboration and make it easier for contributors to participate in the project.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 📖 项目概述

一个使用 Turborepo monorepo 管理和 Hardhat 开发环境构建的区块链 Web3 项目， 目前包含了web端和浏览器插件端。
其提供 Web3 功能，让用户可以直接从浏览器与区块链网络交互。

### 🔑 核心特性

- Monorepo 架构，使用 Turborepo 进行高效的构建系统管理
- 使用 Hardhat 进行智能合约开发
- TypeScript 支持，提供类型安全
- 完整的测试框架支持

## 🏗️ 项目结构

```
project-root/
├── apps/                      # 应用程序包
│   ├── web/                   # Web 应用
│   └── extension/            # 浏览器插件
├── packages/                  # 共享包
│   └── db/                   # 数据库相关
│   └── contracts/              # 智能合约
├── package.json             # 根目录配置
└── turbo.json              # Turborepo 配置
```

## ⚙️ 环境要求

- Node.js lts/hydrogen(v18.20.5)
- pnpm
- Git

## 🚀 快速开始

1. 克隆仓库:
```bash
git clone [仓库地址]
cd [项目名]
```

2. 安装依赖:
在项目根目录下
```bash
pnpm install
```

3. 构建extension项目
根目录下：
```bash
pnpm extension build
```

## 💻 开发指南

### 智能合约开发

1. 进入合约目录:
```bash
cd contracts
```

2. 编译合约:
```bash
npx hardhat compile
```

3. 运行测试:
```bash
npx hardhat test
```

4. 部署合约:
```bash
npx hardhat run scripts/deploy.js --network [网络名称]
```

### 插件开发指南

[具体说明即将添加]

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献流程

1. Fork 本仓库
2. 创建特性分支:
```bash
git checkout -b feature/your-feature-name
```

3. 提交更改:
```bash
git commit -m "feat: 添加某个功能"
```

4. 推送到你的 Fork:
```bash
git push origin feature/your-feature-name
```

5. 提交 Pull Request

### Pull Request 规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- 包含完整的测试
- 更新相关文档
- 保证所有测试通过
- 通过 lint 检查

## 🛠️ 技术栈

- [Turborepo](https://turbo.build/repo) - Monorepo 管理工具
- [Hardhat](https://hardhat.org/) - 以太坊开发环境
- [TypeScript](https://www.typescriptlang.org/) - 编程语言
- [Web3.js](https://web3js.org/) / [Ethers.js](https://docs.ethers.io/) - 以太坊 JavaScript API

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- Issue 提交: [GitHub Issues](https://github.com/username/repo/issues)

---

欢迎提供反馈和建议！