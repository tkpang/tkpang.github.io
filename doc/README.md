# TK Works 文档中心

欢迎来到 TK Works 文档中心！这里包含了网站管理的所有必要文档。

## 📚 文档列表

### 1. [Docker 快速启动](DOCKER_QUICK_START.md)
- Docker 启动命令
- 常用操作
- 故障排除

### 2. [内容更新指南](CONTENT_UPDATE_GUIDE.md)
- 添加演员、短剧、短视频
- 添加文章
- 图片管理
- 快速模板

### 3. [本地测试指南](LOCAL_TESTING_GUIDE.md)
- 三种测试方法
- Jekyll 安装步骤
- 常见问题解决

### 4. [网站功能说明](WORKS_README.md)
- 完整的重构说明
- 功能特性
- 技术栈
- 后续优化建议

---

## 🚀 快速开始

### 启动本地服务器（推荐Docker）

```bash
cd /home/pangtiankai/code/tkpang.github.io

docker run -d --name tkpang-jekyll --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4000:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0
```

访问: **http://localhost:4000**

---

## 📝 常用操作

### 添加新内容
1. 在对应目录创建 .md 文件
2. 添加图片到 img/works/
3. 重启 Docker: `docker restart tkpang-jekyll`

### 提交到GitHub
```bash
git add .
git commit -m "更新内容"
git push origin master
```

---

## 📂 目录结构

```
tkpang.github.io/
├── _actors/              演员作品
├── _dramas/              短剧作品
├── _videos/              短视频作品
├── _posts/               文章博客
├── img/works/            作品图片
│   ├── actors/
│   ├── dramas/
│   └── videos/
└── doc/                  文档中心（你在这里）
```

---

## 🌐 网站信息

- **域名**: hhhh.fun
- **口号**: HHHH, it's FUN!
- **技术**: Jekyll + GitHub Pages
- **主题**: 作品展示 + 创作记录

---

## 📞 需要帮助？

查看对应的详细文档，或参考示例文件：
- 演员示例: `_actors/zhang-san.md`
- 短剧示例: `_dramas/love-story.md`
- 视频示例: `_videos/dance-performance.md`

---

**HHHH, it's FUN!** 🎉
