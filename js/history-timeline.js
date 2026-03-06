// 世界历史时间线交互式可视化

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

        // 布局参数
        this.yearHeight = 2; // 每年的像素高度
        this.columnWidth = 180; // 每个文明列的宽度
        this.leftPadding = 100; // 左侧年份标注区域
        this.topPadding = 50;

        // 交互状态
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.hoveredItem = null;

        // 数据
        this.data = historyData;
        this.regions = ['eastAsia', 'southAsia', 'westAsia', 'europe', 'africa', 'americas'];
        this.filteredRegions = [...this.regions];
        this.timeRange = { min: this.minYear, max: this.maxYear };

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.draw();
    }

    resizeCanvas() {
        const wrapper = this.canvas.parentElement;
        this.canvas.width = wrapper.clientWidth;
        this.canvas.height = wrapper.clientHeight;
    }

    setupEventListeners() {
        // 窗口大小改变
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.draw();
        });

        // 鼠标事件
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));

        // 触摸事件（移动端支持）
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));

        // 控制按钮
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
            // 检测悬停
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

        // 缩放时保持鼠标位置不变
        this.offsetX = mouseX - (mouseX - this.offsetX) * delta;
        this.offsetY = mouseY - (mouseY - this.offsetY) * delta;
        this.scale *= delta;

        // 限制缩放范围
        this.scale = Math.max(0.1, Math.min(5, this.scale));

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
                this.timeRange = { min: 1500, max: 2000 };
                break;
            default:
                this.timeRange = { min: this.minYear, max: this.maxYear };
        }
        this.draw();
    }

    onRegionFilterChange(e) {
        const value = e.target.value;
        if (value === 'all') {
            this.filteredRegions = [...this.regions];
        } else if (value === 'asia') {
            this.filteredRegions = ['eastAsia', 'southAsia', 'westAsia'];
        } else if (value === 'europe') {
            this.filteredRegions = ['europe'];
        } else if (value === 'africa') {
            this.filteredRegions = ['africa'];
        } else if (value === 'americas') {
            this.filteredRegions = ['americas'];
        }
        this.draw();
    }

    resetView() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.timeRange = { min: this.minYear, max: this.maxYear };
        document.getElementById('timeRange').value = 'all';
        this.draw();
    }

    getItemAtPosition(x, y) {
        // 转换为世界坐标
        const worldX = (x - this.offsetX) / this.scale;
        const worldY = (y - this.offsetY) / this.scale;

        // 遍历所有可见的文明
        let colIndex = 0;
        for (const region of this.filteredRegions) {
            const civilizations = this.data[region];
            const colX = this.leftPadding + colIndex * this.columnWidth;

            for (const civ of civilizations) {
                if (civ.startYear > this.timeRange.max || civ.endYear < this.timeRange.min) {
                    continue;
                }

                const startY = this.topPadding + (civ.startYear - this.minYear) * this.yearHeight;
                const endY = this.topPadding + (civ.endYear - this.minYear) * this.yearHeight;
                const height = endY - startY;

                if (worldX >= colX && worldX <= colX + this.columnWidth - 10 &&
                    worldY >= startY && worldY <= startY + height) {
                    return civ;
                }
            }

            colIndex++;
        }

        return null;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.scale, this.scale);

        // 绘制背景网格
        this.drawGrid();

        // 绘制年份标注
        this.drawYearLabels();

        // 绘制地区标题
        this.drawRegionHeaders();

        // 绘制文明方块
        this.drawCivilizations();

        this.ctx.restore();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#ecf0f1';
        this.ctx.lineWidth = 1;

        // 每100年一条横线
        for (let year = Math.ceil(this.timeRange.min / 100) * 100; year <= this.timeRange.max; year += 100) {
            const y = this.topPadding + (year - this.minYear) * this.yearHeight;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.leftPadding + this.filteredRegions.length * this.columnWidth, y);
            this.ctx.stroke();
        }
    }

    drawYearLabels() {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'right';

        // 每100年标注一次
        for (let year = Math.ceil(this.timeRange.min / 100) * 100; year <= this.timeRange.max; year += 100) {
            const y = this.topPadding + (year - this.minYear) * this.yearHeight;
            const label = year < 0 ? `公元前${-year}` : `公元${year}`;
            this.ctx.fillText(label, this.leftPadding - 10, y + 4);
        }
    }

    drawRegionHeaders() {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';

        let colIndex = 0;
        for (const region of this.filteredRegions) {
            const x = this.leftPadding + colIndex * this.columnWidth + this.columnWidth / 2;
            this.ctx.fillText(regionNames[region], x, this.topPadding - 20);
            colIndex++;
        }
    }

    drawCivilizations() {
        let colIndex = 0;

        for (const region of this.filteredRegions) {
            const civilizations = this.data[region];
            const colX = this.leftPadding + colIndex * this.columnWidth;

            for (const civ of civilizations) {
                // 只绘制在时间范围内的文明
                if (civ.startYear > this.timeRange.max || civ.endYear < this.timeRange.min) {
                    continue;
                }

                const startY = this.topPadding + (civ.startYear - this.minYear) * this.yearHeight;
                const endY = this.topPadding + (civ.endYear - this.minYear) * this.yearHeight;
                const height = endY - startY;

                // 绘制方块
                this.ctx.fillStyle = civ.color;
                if (this.hoveredItem === civ) {
                    this.ctx.fillStyle = this.lightenColor(civ.color, 20);
                }

                this.ctx.fillRect(colX + 5, startY, this.columnWidth - 15, height);

                // 绘制边框
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(colX + 5, startY, this.columnWidth - 15, height);

                // 绘制文字（如果高度足够）
                if (height > 20) {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.font = 'bold 12px Arial';
                    this.ctx.textAlign = 'center';

                    const textX = colX + this.columnWidth / 2;
                    const textY = startY + height / 2;

                    // 绘制文明名称
                    this.ctx.fillText(civ.name, textX, textY);

                    // 绘制年份（如果高度足够）
                    if (height > 40) {
                        this.ctx.font = '10px Arial';
                        const yearText = `${civ.startYear < 0 ? 'BC' : ''}${Math.abs(civ.startYear)} - ${civ.endYear < 0 ? 'BC' : ''}${Math.abs(civ.endYear)}`;
                        this.ctx.fillText(yearText, textX, textY + 15);
                    }
                }
            }

            colIndex++;
        }
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    showDetailPanel(civ) {
        const panel = document.getElementById('detailPanel');
        const title = document.getElementById('detailTitle');
        const period = document.getElementById('detailPeriod');
        const region = document.getElementById('detailRegion');
        const description = document.getElementById('detailDescription');
        const events = document.getElementById('detailEvents');

        title.textContent = civ.name;

        const startYear = civ.startYear < 0 ? `公元前${-civ.startYear}年` : `公元${civ.startYear}年`;
        const endYear = civ.endYear < 0 ? `公元前${-civ.endYear}年` : `公元${civ.endYear}年`;
        period.textContent = `${startYear} - ${endYear}`;

        region.textContent = regionNames[civ.region];
        description.textContent = civ.description;

        events.innerHTML = '';
        civ.events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            events.appendChild(li);
        });

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
