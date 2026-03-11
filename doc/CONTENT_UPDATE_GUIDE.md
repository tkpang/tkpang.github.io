# 内容更新指南

## 📂 文件位置速查

### 演员信息
- **位置**: `_actors/`
- **示例**: `_actors/zhang-san.md`
- **图片**: `img/works/actors/`

### 短剧信息
- **位置**: `_dramas/`
- **示例**: `_dramas/love-story.md`
- **图片**: `img/works/dramas/`

### 短视频信息
- **位置**: `_videos/`
- **示例**: `_videos/dance-performance.md`
- **图片**: `img/works/videos/`

### 文章/博客
- **位置**: `_posts/`
- **格式**: `YYYY-MM-DD-标题.md`
- **示例**: `_posts/2023-7-10-搭建终生受用的笔记系统.md`

---

## 🚀 快速添加内容

### 添加新演员

```bash
# 1. 创建文件
nano _actors/新演员.md

# 2. 填写内容（参考下方模板）

# 3. 添加图片到 img/works/actors/

# 4. 重启Docker
docker restart tkpang-jekyll
```

**演员模板**:
```yaml
---
layout: work-detail
category: actor
title: "演员名字"
cover: /img/works/actors/xxx.jpg
description: "简短介绍"

height: 175
hometown: "城市"
skills: ["表演", "唱歌"]

featured: true
order: 1
---

演员详细介绍...
```

---

### 添加新短剧

```bash
# 1. 创建文件
nano _dramas/新短剧.md

# 2. 添加图片到 img/works/dramas/

# 3. 重启Docker
docker restart tkpang-jekyll
```

**短剧模板**:
```yaml
---
layout: work-detail
category: drama
title: "短剧名称"
cover: /img/works/dramas/xxx.jpg
poster: /img/works/dramas/xxx-poster.jpg
description: "剧情简介"

episode_count: 12
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

---

### 添加新短视频

```bash
# 1. 创建文件
nano _videos/新视频.md

# 2. 添加缩略图到 img/works/videos/

# 3. 重启Docker
docker restart tkpang-jekyll
```

**视频模板**:
```yaml
---
layout: work-detail
category: video
title: "视频标题"
cover: /img/works/videos/xxx.jpg
description: "视频描述"

duration: 90
view_count: 50000
platforms: ["抖音", "小红书"]
tags: ["舞蹈", "创意"]

platform_links:
  - name: "抖音"
    url: "https://..."
    views: 30000

featured: true
order: 1
---

视频详细说明...
```

---

### 添加新文章

```bash
# 1. 创建文件（注意日期格式）
nano _posts/2026-03-11-文章标题.md

# 2. 重启Docker
docker restart tkpang-jekyll
```

**文章模板**:
```yaml
---
layout: post
title: "文章标题"
subtitle: "副标题"
date: 2026-03-11
author: tkpang
header-img: img/post-bg-home.jpg
catalog: true
tags:
    - 标签1
    - 标签2
---

文章内容...
```

---

## 🎯 重要字段说明

### featured（首页展示）
```yaml
featured: true   # 在首页"精选作品"展示
featured: false  # 不在首页展示（但作品集页面可见）
```

### order（排序）
```yaml
order: 1   # 第一个
order: 2   # 第二个
order: 3   # 第三个
```
数字越小，显示越靠前。

---

## 📸 图片规格建议

- **演员照片**: 2:3 比例 (如 300x450px), < 150KB
- **短剧海报**: 3:4 比例 (如 280x420px), < 150KB
- **视频缩略图**: 16:9 比例 (如 320x180px), < 100KB

---

## 🔄 更新流程

1. **添加/修改内容** → 编辑对应的 .md 文件
2. **添加图片** → 复制到对应的 img/works/ 子目录
3. **重启服务器** → `docker restart tkpang-jekyll`
4. **查看效果** → 浏览器访问 http://localhost:4000
5. **提交更改** → `git add .` → `git commit` → `git push`

---

## 💡 批量操作

### 批量添加图片
```bash
# 复制多个图片
cp /path/to/photos/* img/works/actors/
cp /path/to/posters/* img/works/dramas/
cp /path/to/thumbnails/* img/works/videos/
```

### 批量创建演员文件
```bash
# 创建多个演员
for name in "演员1" "演员2" "演员3"; do
    cp _actors/zhang-san.md "_actors/$name.md"
    # 然后手动编辑每个文件
done
```

---

**更新日期**: 2026-03-11
