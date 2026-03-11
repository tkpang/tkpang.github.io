# TK Works - 网站重构说明

## 重构概述

网站已从传统博客转型为**作品展示+创作记录**的混合平台。

### 主要变更

#### 1. 新增作品集系统
- **三种作品类型**：
  - 演员（`_actors/`）
  - 短剧（`_dramas/`）
  - 短视频（`_videos/`）

- **作品管理方式**：每个作品一个Markdown文件

#### 2. 页面结构调整
- **首页** (`index.html`)：精选作品 + 最新文章混合展示
- **作品集页** (`works/index.html`)：统一展示所有作品，支持分类筛选
- **博客页** (`blog.html`)：所有文章列表
- **作品详情页**：每个作品的独立详情页面

#### 3. 导航菜单更新
```
首页 | 作品集 | 博客 | 关于
```

## 如何添加新作品

### 添加演员

在 `_actors/` 目录下创建新文件，例如 `li-si.md`：

```yaml
---
layout: work-detail
category: actor
title: "李四"
cover: /img/works/actors/li-si.jpg
description: "简短介绍"

# 详细信息
height: 170
hometown: "上海"
skills: ["表演", "唱歌"]

# 展示设置
featured: true  # 是否在首页展示
order: 2        # 排序（数字越小越靠前）
---

演员的详细介绍内容...
```

### 添加短剧

在 `_dramas/` 目录下创建新文件：

```yaml
---
layout: work-detail
category: drama
title: "短剧名称"
cover: /img/works/dramas/xxx.jpg
poster: /img/works/dramas/xxx-poster.jpg
description: "剧情简介"

episode_count: 10
duration: 5
status: "完结"
genres: ["爱情", "喜剧"]
cast: ["演员1", "演员2"]
douban_rating: 8.5

watch_links:
  - platform: "抖音"
    url: "https://..."

featured: true
order: 1
---

剧情详细介绍...
```

### 添加短视频

在 `_videos/` 目录下创建新文件：

```yaml
---
layout: work-detail
category: video
title: "视频标题"
cover: /img/works/videos/xxx.jpg
description: "视频描述"

duration: 60
view_count: 10000
platforms: ["抖音", "小红书"]
tags: ["舞蹈", "创意"]

platform_links:
  - name: "抖音"
    url: "https://..."
    views: 10000

featured: true
order: 1
---

视频详细说明...
```

## 图片管理

### 目录结构
```
img/works/
├── actors/       # 演员照片
├── dramas/       # 短剧海报和封面
└── videos/       # 视频缩略图
```

### 图片规格建议
- **演员照片**：2:3 比例（如 300x450px）
- **短剧海报**：3:4 比例（如 280x420px）
- **视频缩略图**：16:9 比例（如 320x180px）
- **文件大小**：建议每张图片 < 150KB

## 本地测试

### 1. 安装依赖
```bash
bundle install
```

### 2. 启动本地服务器
```bash
bundle exec jekyll serve
```

### 3. 访问网站
打开浏览器访问：`http://localhost:4000`

## 主要文件说明

### 配置文件
- `_config.yml` - Jekyll配置，包含collections定义

### 布局文件
- `_layouts/work-detail.html` - 作品详情页布局
- `_layouts/page.html` - 普通页面布局（继承自default）
- `_layouts/post.html` - 文章页布局

### 样式文件
- `css/works.css` - 作品集专用样式
- `css/hux-blog.min.css` - 原有博客样式

### 脚本文件
- `js/works.js` - 作品集交互功能（筛选、动画）

### 页面文件
- `index.html` - 首页
- `works/index.html` - 作品集展示页
- `blog.html` - 文章列表页
- `about.html` - 关于页面

### 数据目录
- `_actors/` - 演员作品数据
- `_dramas/` - 短剧作品数据
- `_videos/` - 短视频作品数据
- `_posts/` - 文章数据（保留原有）

## 功能特性

### 1. 作品筛选
在作品集页面可以按类别筛选：
- 全部作品
- 演员
- 短剧
- 短视频

### 2. 精选展示
将作品的 `featured: true` 设置为精选，会在首页展示

### 3. 排序控制
通过 `order` 字段控制作品显示顺序（数字越小越靠前）

### 4. 响应式设计
- 桌面：4列网格
- 平板：3列网格
- 手机：1列显示

### 5. 性能优化
- 图片懒加载
- CSS动画优化
- 返回顶部按钮

## 文章保留

所有原有文章（`_posts/`目录）已完整保留：
- 2023-7-10-搭建终生受用的笔记系统.md
- 2023-7-11-AI画图.md
- 2023-7-11-Linux性能瓶颈分析.md
- 2023-7-5-test.md
- 2023-9-24-科学探讨社会主义.md

文章继续使用原有的 `post.html` 布局，可以通过博客页面访问。

## 部署

### GitHub Pages部署
1. 提交所有更改到GitHub
2. 确保 `_config.yml` 中的 `url` 和 `baseurl` 正确
3. GitHub Pages会自动构建并部署

```bash
git add .
git commit -m "网站重构：作品展示平台上线"
git push origin master
```

## 后续优化建议

1. **添加搜索功能** - 使用 jekyll-search 或 Algolia
2. **图片优化** - 使用 WebP 格式，提供 CDN 加速
3. **评论系统** - 为作品详情页启用 Gitalk 评论（已集成）
4. **分享功能** - 添加社交媒体分享按钮
5. **统计分析** - 接入百度统计或 Google Analytics（已配置）

## 技术栈

- Jekyll 静态网站生成器
- Bootstrap 3 响应式框架
- CSS Grid 布局
- Vanilla JavaScript（无jQuery依赖）
- Gitalk 评论系统

## 许可证

本项目基于原有博客模板重构，保留原有许可证。

---

**更新日期**: 2026-03-11
**版本**: 2.0.0
**维护者**: TK
