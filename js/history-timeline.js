// 世界历史时间线交互式可视化 - 优化版
// 模仿纸质版的紧凑金字塔布局

class HistoryTimeline {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // 视图参数
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.minYear = -3500;
        this.maxYear = 2024;

        // 布局参数 - 更紧凑
        this.yearHeight = 0.15; // 每年的像素高度，更小以压缩整体
        this.leftPadding = 60;
        this.topPadding = 30;
        this.minBlockWidth = 60;
        this.maxBlockWidth = 200;
        this.blockGap = 2;

        // 交互状态
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.hoveredItem = null;

        // 数据
        this.data = historyData;
        this.processedData = [];
        this.timeRange = { min: this.minYear, max: this.maxYear };

        this.init();
    }

    init() {
        this.processData();
        this.resizeCanvas();
        this.setupEventListeners();
        this.fitToScreen();
        this.draw();
    }

    // 处理数据，计算每个文明的位置和宽度
    processData() {
        this.processedData = [];

        // 收集所有文明并按开始时间排序
        const allCivs = [];
        const regions = ['eastAsia', 'southAsia', 'westAsia', 'europe', 'africa', 'americas'];

        regions.forEach((region, regionIndex) => {
            if (this.data[region]) {
                this.data[region].forEach(civ => {
                    allCivs.push({
                        ...civ,
                        regionIndex,
                        duration: civ.endYear - civ.startYear,
                        // 根据持续时间和重要性计算宽度权重
                        importance: this.calculateImportance(civ)
                    });
                });
            }
        });

        // 按时间段分组处理，计算X位置
        this.layoutCivilizations(allCivs);
    }

    calculateImportance(civ) {
        // 根据持续时间和一些重要朝代给予更高权重
        const duration = civ.endYear - civ.startYear;
        let importance = Math.sqrt(duration) * 3;

        // 主要文明给予更高权重
        const majorCivs = ['秦朝', '汉朝', '唐朝', '明朝', '清朝', '罗马帝国', '古埃及文明',
                          '波斯帝国', '阿拉伯帝国', '奥斯曼帝国', '莫卧儿帝国', '蒙古帝国',
                          '中华人民共和国', '美国独立与发展', '大英帝国'];
        if (majorCivs.some(name => civ.name.includes(name))) {
            importance *= 1.5;
        }

        return Math.max(40, Math.min(180, importance));
    }

    layoutCivilizations(allCivs) {
        // 按开始年份排序
        allCivs.sort((a, b) => a.startYear - b.startYear);

        // 为每个文明分配X位置，避免重叠
        const timeSlots = []; // 记录每个X位置的占用情况

        allCivs.forEach(civ => {
            const width = civ.importance;
            let x = this.leftPadding;

            // 找到一个不与现有文明重叠的X位置
            let foundSlot = false;
            while (!foundSlot) {
                foundSlot = true;
                for (const slot of timeSlots) {
                    // 检查时间是否重叠
                    if (!(civ.endYear < slot.startYear || civ.startYear > slot.endYear)) {
                        // 时间重叠，检查X位置是否重叠
                        if (!(x + width < slot.x || x > slot.x + slot.width)) {
                            // X位置也重叠，移动到这个slot的右边
                            x = slot.x + slot.width + this.blockGap;
                            foundSlot = false;
                            break;
                        }
                    }
                }
            }

            civ.x = x;
            civ.width = width;

            timeSlots.push({
                x: x,
                width: width,
                startYear: civ.startYear,
                endYear: civ.endYear
            });

            this.processedData.push(civ);
        });
    }

    resizeCanvas() {
        const wrapper = this.canvas.parentElement;
        this.canvas.width = wrapper.clientWidth;
        this.canvas.height = wrapper.clientHeight;
    }

    fitToScreen() {
        // 计算内容的边界
        let maxX = 0;
        let maxY = 0;

        this.processedData.forEach(civ => {
            const endX = civ.x + civ.width;
            const endY = this.topPadding + (civ.endYear - this.minYear) * this.yearHeight;
            maxX = Math.max(maxX, endX);
            maxY = Math.max(maxY, endY);
        });

        // 计算合适的缩放比例，让内容适应屏幕
        const scaleX = (this.canvas.width - 40) / (maxX + 20);
        const scaleY = (this.canvas.height - 40) / (maxY + 20);
        this.scale = Math.min(scaleX, scaleY, 1.5);

        // 居中显示
        this.offsetX = (this.canvas.width - maxX * this.scale) / 2;
        this.offsetY = 10;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.fitToScreen();
            this.draw();
        });

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));

        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));

        document.getElementById('timeRange').addEventListener('change', this.onTimeRangeChange.bind(this));
        document.getElementById('regionFilter').addEventListener('change', this.onRegionFilterChange.bind(this));
        document.getElementById('resetZoom').addEventListener('click', this.resetView.bind(this));
        document.getElementById('closeDetail').addEventListener('click', this.closeDetailPanel.bind(this));
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.canvas.style.cursor = 'grabbing';
    }

    onMouseMove(e) {
        if (this.isDragging) {
            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            this.offsetX += dx;
            this.offsetY += dy;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.draw();
        } else {
            const item = this.getItemAtPosition(e.offsetX, e.offsetY);
            if (item !== this.hoveredItem) {
                this.hoveredItem = item;
                this.canvas.style.cursor = item ? 'pointer' : 'grab';
                this.draw();
            }
        }
    }

    onMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = this.hoveredItem ? 'pointer' : 'grab';
    }

    onWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        this.offsetX = mouseX - (mouseX - this.offsetX) * delta;
        this.offsetY = mouseY - (mouseY - this.offsetY) * delta;
        this.scale *= delta;
        this.scale = Math.max(0.3, Math.min(5, this.scale));

        this.draw();
    }

    onClick(e) {
        const item = this.getItemAtPosition(e.offsetX, e.offsetY);
        if (item) {
            this.showDetailPanel(item);
        }
    }

    onTouchStart(e) {
        if (e.touches.length === 1) {
            this.isDragging = true;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
        }
    }

    onTouchMove(e) {
        e.preventDefault();
        if (this.isDragging && e.touches.length === 1) {
            const dx = e.touches[0].clientX - this.lastMouseX;
            const dy = e.touches[0].clientY - this.lastMouseY;
            this.offsetX += dx;
            this.offsetY += dy;
            this.lastMouseX = e.touches[0].clientX;
            this.lastMouseY = e.touches[0].clientY;
            this.draw();
        }
    }

    onTouchEnd(e) {
        this.isDragging = false;
    }

    onTimeRangeChange(e) {
        const value = e.target.value;
        switch (value) {
            case 'ancient':
                this.timeRange = { min: -3000, max: 500 };
                break;
            case 'medieval':
                this.timeRange = { min: 500, max: 1500 };
                break;
            case 'modern':
                this.timeRange = { min: 1500, max: 2024 };
                break;
            default:
                this.timeRange = { min: this.minYear, max: this.maxYear };
        }
        this.fitToScreen();
        this.draw();
    }

    onRegionFilterChange(e) {
        // 重新处理数据以应用过滤
        this.processData();
        this.fitToScreen();
        this.draw();
    }

    resetView() {
        this.timeRange = { min: this.minYear, max: this.maxYear };
        document.getElementById('timeRange').value = 'all';
        this.fitToScreen();
        this.draw();
    }

    getItemAtPosition(x, y) {
        const worldX = (x - this.offsetX) / this.scale;
        const worldY = (y - this.offsetY) / this.scale;

        for (const civ of this.processedData) {
            if (civ.startYear > this.timeRange.max || civ.endYear < this.timeRange.min) {
                continue;
            }

            const startY = this.topPadding + (civ.startYear - this.minYear) * this.yearHeight;
            const endY = this.topPadding + (civ.endYear - this.minYear) * this.yearHeight;
            const height = endY - startY;

            if (worldX >= civ.x && worldX <= civ.x + civ.width &&
                worldY >= startY && worldY <= startY + height) {
                return civ;
            }
        }

        return null;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制浅色背景
        this.ctx.fillStyle = '#faf8f5';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.scale, this.scale);

        // 绘制年份刻度线
        this.drawYearMarkers();

        // 绘制文明方块
        this.drawCivilizations();

        this.ctx.restore();
    }

    drawYearMarkers() {
        this.ctx.fillStyle = '#999';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'right';

        // 每500年标注一次
        for (let year = Math.ceil(this.minYear / 500) * 500; year <= this.maxYear; year += 500) {
            const y = this.topPadding + (year - this.minYear) * this.yearHeight;

            // 绘制刻度线
            this.ctx.strokeStyle = '#ddd';
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.leftPadding - 5, y);
            this.ctx.stroke();

            // 绘制年份标注
            const label = year < 0 ? `${-year}BC` : `${year}`;
            this.ctx.fillText(label, this.leftPadding - 8, y + 3);
        }
    }

    drawCivilizations() {
        for (const civ of this.processedData) {
            if (civ.startYear > this.timeRange.max || civ.endYear < this.timeRange.min) {
                continue;
            }

            const startY = this.topPadding + (civ.startYear - this.minYear) * this.yearHeight;
            const endY = this.topPadding + (civ.endYear - this.minYear) * this.yearHeight;
            const height = Math.max(endY - startY, 8);

            // 绘制方块
            let fillColor = civ.color;
            if (this.hoveredItem === civ) {
                fillColor = this.lightenColor(civ.color, 15);
            }

            // 绘制带圆角的矩形
            this.roundRect(civ.x, startY, civ.width, height, 3, fillColor);

            // 绘制边框
            this.ctx.strokeStyle = this.darkenColor(civ.color, 20);
            this.ctx.lineWidth = 1;
            this.ctx.stroke();

            // 绘制文字
            if (height > 12 && civ.width > 30) {
                this.ctx.fillStyle = '#fff';
                this.ctx.textAlign = 'center';

                // 根据方块大小调整字体
                const fontSize = Math.min(11, Math.max(8, civ.width / 8));
                this.ctx.font = `bold ${fontSize}px Arial`;

                const textX = civ.x + civ.width / 2;
                const textY = startY + height / 2 + fontSize / 3;

                // 绘制文字阴影
                this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
                this.ctx.shadowBlur = 2;
                this.ctx.shadowOffsetX = 1;
                this.ctx.shadowOffsetY = 1;

                // 截断过长的名字
                let name = civ.name;
                if (this.ctx.measureText(name).width > civ.width - 4) {
                    while (this.ctx.measureText(name + '..').width > civ.width - 4 && name.length > 1) {
                        name = name.slice(0, -1);
                    }
                    name += '..';
                }

                this.ctx.fillText(name, textX, textY);

                // 重置阴影
                this.ctx.shadowColor = 'transparent';
                this.ctx.shadowBlur = 0;

                // 如果空间足够，显示年份
                if (height > 25) {
                    this.ctx.font = `${fontSize - 2}px Arial`;
                    const startYearStr = civ.startYear < 0 ? `${-civ.startYear}BC` : `${civ.startYear}`;
                    const endYearStr = civ.endYear < 0 ? `${-civ.endYear}BC` : `${civ.endYear}`;
                    this.ctx.fillText(`${startYearStr}-${endYearStr}`, textX, textY + fontSize);
                }
            }
        }
    }

    roundRect(x, y, width, height, radius, fillColor) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fillStyle = fillColor;
        this.ctx.fill();
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    showDetailPanel(civ) {
        const panel = document.getElementById('detailPanel');
        const title = document.getElementById('detailTitle');
        const period = document.getElementById('detailPeriod');
        const region = document.getElementById('detailRegion');
        const description = document.getElementById('detailDescription');
        const events = document.getElementById('detailEvents');

        title.textContent = civ.name;
        title.style.backgroundColor = civ.color;

        const startYear = civ.startYear < 0 ? `公元前${-civ.startYear}年` : `公元${civ.startYear}年`;
        const endYear = civ.endYear < 0 ? `公元前${-civ.endYear}年` : `公元${civ.endYear}年`;
        const duration = civ.endYear - civ.startYear;
        period.textContent = `${startYear} - ${endYear} (${duration}年)`;

        region.textContent = regionNames[civ.region];
        description.textContent = civ.description;

        events.innerHTML = '';
        if (civ.events) {
            civ.events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = event;
                events.appendChild(li);
            });
        }

        panel.classList.remove('hidden');
    }

    closeDetailPanel() {
        const panel = document.getElementById('detailPanel');
        panel.classList.add('hidden');
    }
}

// 初始化时间线
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new HistoryTimeline('timelineCanvas');
});
