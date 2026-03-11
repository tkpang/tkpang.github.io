# 本地测试指南

## 方法一：安装Ruby开发包（推荐）

### 1. 安装必要的开发工具

打开终端，运行：

```bash
sudo apt-get update
sudo apt-get install ruby-dev build-essential
```

输入密码后等待安装完成。

### 2. 安装项目依赖

```bash
cd /home/pangtiankai/code/tkpang.github.io
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"
bundle config set --local path 'vendor/bundle'
bundle install
```

### 3. 启动Jekyll服务器

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

### 4. 访问网站

打开浏览器访问：`http://localhost:4000`

---

## 方法二：使用Docker（无需安装Ruby）

如果你安装了Docker，可以使用这个更简单的方法：

### 1. 拉取Jekyll镜像并启动

```bash
cd /home/pangtiankai/code/tkpang.github.io

docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4000:4000 \
  jekyll/jekyll:4 \
  jekyll serve --watch --force_polling
```

### 2. 访问网站

打开浏览器访问：`http://localhost:4000`

---

## 方法三：使用Python简单HTTP服务器（仅预览HTML）

如果只想快速预览HTML文件（不处理Jekyll模板）：

```bash
cd /home/pangtiankai/code/tkpang.github.io/_site
python3 -m http.server 4000
```

然后访问：`http://localhost:4000`

**注意**：这个方法需要先用Jekyll构建网站，否则_site目录可能是空的或过时的。

---

## 推荐操作流程

### 首次设置（选择方法一）

```bash
# 1. 安装开发工具（需要sudo权限）
sudo apt-get update && sudo apt-get install -y ruby-dev build-essential

# 2. 进入项目目录
cd /home/pangtiankai/code/tkpang.github.io

# 3. 配置bundler使用本地路径
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"
bundle config set --local path 'vendor/bundle'

# 4. 安装依赖
bundle install

# 5. 启动服务器
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

### 以后每次启动

```bash
cd /home/pangtiankai/code/tkpang.github.io
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

或者创建一个启动脚本：

```bash
#!/bin/bash
# 保存为 start-server.sh

cd /home/pangtiankai/code/tkpang.github.io
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

然后：
```bash
chmod +x start-server.sh
./start-server.sh
```

---

## 常见问题

### Q: 端口4000已被占用
```bash
# 使用其他端口
bundle exec jekyll serve --host 0.0.0.0 --port 4001
```

### Q: 修改文件后页面没有更新
Jekyll有自动重载功能，保存文件后等待几秒即可。如果还是没更新：
1. 按 Ctrl+C 停止服务器
2. 重新运行启动命令

### Q: _config.yml修改后没生效
修改配置文件后必须重启Jekyll服务器。

### Q: 图片显示404
确保图片路径正确：
- 使用绝对路径：`/img/works/xxx.jpg`
- 图片文件已存在于对应目录

---

## 快速命令参考

```bash
# 添加PATH环境变量（每次新终端都需要）
export PATH="$HOME/.local/share/gem/ruby/3.0.0/bin:$PATH"

# 查看Jekyll版本
jekyll --version

# 启动服务器
bundle exec jekyll serve

# 启动服务器（监听所有网络接口）
bundle exec jekyll serve --host 0.0.0.0

# 启动服务器（指定端口）
bundle exec jekyll serve --port 4001

# 启动服务器（不自动重载）
bundle exec jekyll serve --no-watch

# 仅构建网站（不启动服务器）
bundle exec jekyll build

# 清理构建文件
bundle exec jekyll clean
```

---

## 验证网站功能

启动服务器后，访问以下页面验证功能：

1. **首页** - `http://localhost:4000/`
   - 应该看到精选作品和最新文章

2. **作品集页** - `http://localhost:4000/works/`
   - 应该看到所有作品
   - 点击筛选标签测试功能

3. **博客页** - `http://localhost:4000/blog.html`
   - 应该看到所有文章列表

4. **作品详情页** - 点击任意作品卡片
   - 应该正确显示作品详细信息

5. **导航菜单** - 测试所有导航链接
   - 首页、作品集、博客、关于

---

## 部署到GitHub Pages

本地测试通过后，提交并推送到GitHub：

```bash
git add .
git commit -m "网站重构：作品展示平台上线"
git push origin master
```

GitHub Pages会自动构建并部署网站，几分钟后即可访问。

---

**祝你测试顺利！** 🚀
