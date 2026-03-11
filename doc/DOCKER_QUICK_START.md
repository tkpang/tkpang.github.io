# Docker 快速启动指南

## 快速命令

### 启动服务器

```bash
cd /home/pangtiankai/code/tkpang.github.io

docker run -d --name tkpang-jekyll --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4000:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0
```

### 访问网站

打开浏览器访问：**http://localhost:4000**

---

## 常用命令

### 查看服务器日志
```bash
docker logs -f tkpang-jekyll
```

### 停止服务器
```bash
docker stop tkpang-jekyll
```

### 重启服务器
```bash
docker restart tkpang-jekyll
```

### 删除容器
```bash
docker rm -f tkpang-jekyll
```

---

## 一键启动脚本

创建文件 `start-jekyll.sh`：

```bash
#!/bin/bash
cd /home/pangtiankai/code/tkpang.github.io

# 停止旧容器（如果存在）
docker rm -f tkpang-jekyll 2>/dev/null || true

# 启动新容器
docker run -d --name tkpang-jekyll --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4000:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0

echo "Jekyll 服务器已启动！"
echo "访问: http://localhost:4000"
echo ""
echo "查看日志: docker logs -f tkpang-jekyll"
echo "停止服务: docker stop tkpang-jekyll"
```

使用：
```bash
chmod +x start-jekyll.sh
./start-jekyll.sh
```

---

## 故障排除

### 端口被占用
```bash
# 使用其他端口
docker run -d --name tkpang-jekyll --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4001:4000 \
  jekyll/jekyll:latest \
  jekyll serve --watch --force_polling --host 0.0.0.0

# 然后访问 http://localhost:4001
```

### 容器名称冲突
```bash
# 先删除旧容器
docker rm -f tkpang-jekyll

# 再启动新容器
```

### 查看所有运行的容器
```bash
docker ps
```

### 查看所有容器（包括已停止的）
```bash
docker ps -a
```

---

**日期**: 2026-03-11
