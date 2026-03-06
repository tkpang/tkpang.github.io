// 世界历史时间线 - 精确复刻纸质版布局

class HistoryTimeline {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // 时间范围
        this.minYear = -3500;
        this.maxYear = 2024;

        // 视图参数
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;

        // 交互状态
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.hoveredItem = null;

        // 数据
        this.data = historyData.civilizations;
        this.timeRange = { min: this.minYear, max: this.maxYear };
        this.filteredData = [...this.data];

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.fitToScreen();
        this.draw();
    }

    resizeCanvas() {
        const wrapper = this.canvas.parentElement;
        const rect = wrapper.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    fitToScreen() {
        // 计算合适的缩放比例
        const totalYears = this.maxYear - this.minYear;
        const contentHeight = totalYears * 0.12; // 每年0.12像素
        const contentWidth = 1000; // 数据中的最大X + 宽度

        const scaleX = (this.canvas.width - 80) / contentWidth;
        const scaleY = (this.canvas.height - 60) / contentHeight;

        this.scale = Math.min(scaleX, scaleY);

        // 居中
        this.offsetX = (this.canvas.width - contentWidth * this.scale) / 2;
        this.offsetY = 30;
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

        // 触摸支持
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));

        // 控制按钮
        document.getElementById('timeRange')?.addEventListener('change', this.onTimeRangeChange.bind(this));
        document.getElementById('regionFilter')?.addEventListener('change', this.onRegionFilterChange.bind(this));
        document.getElementById('resetZoom')?.addEventListener('click', this.resetView.bind(this));
        document.getElementById('closeDetail')?.addEventListener('click', this.closeDetailPanel.bind(this));
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        this.canvas.style.cursor = 'grabbing';
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (this.isDragging) {
            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            this.offsetX += dx;
            this.offsetY += dy;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.draw();
        } else {
            const item = this.getItemAtPosition(mouseX, mouseY);
            if (item !== this.hoveredItem) {
                this.hoveredItem = item;
                this.canvas.style.cursor = item ? 'pointer' : 'grab';
                this.draw();
            }
        }
    }

    onMouseUp() {
        this.isDragging = false;
        this.canvas.style.cursor = this.hoveredItem ? 'pointer' : 'grab';
    }

    onWheel(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.3, Math.min(8, this.scale * delta));

        // 以鼠标位置为中心缩放
        this.offsetX = mouseX - (mouseX - this.offsetX) * (newScale / this.scale);
        this.offsetY = mouseY - (mouseY - this.offsetY) * (newScale / this.scale);
        this.scale = newScale;

        this.draw();
    }

    onClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const item = this.getItemAtPosition(mouseX, mouseY);
        if (item) {
            this.showDetailPanel(item);
        }
    }

    onTouchStart(e) {
        e.preventDefault();
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

    onTouchEnd() {
        this.isDragging = false;
    }

    onTimeRangeChange() {
        const value = document.getElementById('timeRange')?.value || 'all';
        switch (value) {
            case 'ancient':
                this.timeRange = { min: -3500, max: 500 };
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
        this.filterData();
        this.draw();
    }

    onRegionFilterChange(e) {
        this.filterData();
        this.draw();
    }

    filterData() {
        const regionValue = document.getElementById('regionFilter')?.value || 'all';

        this.filteredData = this.data.filter(civ => {
            // 时间过滤
            if (civ.end < this.timeRange.min || civ.start > this.timeRange.max) {
                return false;
            }
            // 地区过滤
            if (regionValue === 'all') return true;
            if (regionValue === 'asia') {
                return ['china', 'southAsia', 'westAsia', 'mongol'].includes(civ.region);
            }
            return civ.region === regionValue;
        });
    }

    resetView() {
        this.timeRange = { min: this.minYear, max: this.maxYear };
        document.getElementById('timeRange').value = 'all';
        document.getElementById('regionFilter').value = 'all';
        this.filteredData = [...this.data];
        this.fitToScreen();
        this.draw();
    }

    yearToY(year) {
        return (year - this.minYear) * 0.12;
    }

    getItemAtPosition(mouseX, mouseY) {
        // 转换为世界坐标
        const worldX = (mouseX - this.offsetX) / this.scale;
        const worldY = (mouseY - this.offsetY) / this.scale;

        for (const civ of this.filteredData) {
            const y1 = this.yearToY(civ.start);
            const y2 = this.yearToY(civ.end);
            const height = Math.max(y2 - y1, 5);

            if (worldX >= civ.x && worldX <= civ.x + civ.w &&
                worldY >= y1 && worldY <= y1 + height) {
                return civ;
            }
        }
        return null;
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 浅米色背景
        ctx.fillStyle = '#fdf6e3';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);
        ctx.scale(this.scale, this.scale);

        // 绘制时间刻度
        this.drawTimeScale();

        // 绘制文明方块
        this.drawCivilizations();

        ctx.restore();
    }

    drawTimeScale() {
        const ctx = this.ctx;
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';

        // 每500年绘制一条刻度线
        for (let year = -3500; year <= 2024; year += 500) {
            const y = this.yearToY(year);

            // 刻度线
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(-30, y);
            ctx.lineTo(1000, y);
            ctx.stroke();

            // 年份标签
            ctx.font = '8px Arial';
            ctx.fillStyle = '#999';
            const label = year < 0 ? `${-year}BC` : `${year}AD`;
            ctx.fillText(label, -5, y + 3);
        }
    }

    drawCivilizations() {
        const ctx = this.ctx;

        for (const civ of this.filteredData) {
            const x = civ.x;
            const y1 = this.yearToY(civ.start);
            const y2 = this.yearToY(civ.end);
            const width = civ.w;
            const height = Math.max(y2 - y1, 5);

            // 绘制方块
            let fillColor = civ.color;
            if (this.hoveredItem === civ) {
                fillColor = this.lightenColor(civ.color, 20);
            }

            // 绘制填充
            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y1, width, height);

            // 绘制边框
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y1, width, height);

            // 绘制文字
            this.drawCivText(civ, x, y1, width, height);
        }
    }

    drawCivText(civ, x, y, width, height) {
        const ctx = this.ctx;
        const centerX = x + width / 2;
        const centerY = y + height / 2;

        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';

        // 根据方块大小调整字体
        if (height < 8) return; // 太小不显示文字

        // 中文名称
        let fontSize = Math.min(10, Math.max(5, width / 6, height / 3));
        ctx.font = `bold ${fontSize}px "Microsoft YaHei", "PingFang SC", sans-serif`;

        // 文字阴影
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // 截断过长的名字
        let name = civ.name;
        const maxWidth = width - 4;
        while (ctx.measureText(name).width > maxWidth && name.length > 1) {
            name = name.slice(0, -1);
        }

        ctx.fillText(name, centerX, centerY);

        // 英文名称（如果空间足够）
        if (height > 15 && width > 35) {
            ctx.font = `${fontSize * 0.6}px Arial`;
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            let nameEn = civ.nameEn || '';
            while (ctx.measureText(nameEn).width > maxWidth && nameEn.length > 1) {
                nameEn = nameEn.slice(0, -1);
            }
            ctx.fillText(nameEn, centerX, centerY + fontSize * 0.8);
        }

        // 年份（如果空间足够）
        if (height > 25 && width > 40) {
            ctx.font = `${fontSize * 0.5}px Arial`;
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            const startStr = civ.start < 0 ? `${-civ.start}BC` : `${civ.start}`;
            const endStr = civ.end < 0 ? `${-civ.end}BC` : `${civ.end}`;
            ctx.fillText(`${startStr}-${endStr}`, centerX, centerY + fontSize * 1.5);
        }

        // 重置阴影
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }

    showDetailPanel(civ) {
        const panel = document.getElementById('detailPanel');
        if (!panel) return;

        document.getElementById('detailTitle').textContent = `${civ.name} ${civ.nameEn || ''}`;
        document.getElementById('detailTitle').style.backgroundColor = civ.color;

        const startYear = civ.start < 0 ? `公元前${-civ.start}年` : `公元${civ.start}年`;
        const endYear = civ.end < 0 ? `公元前${-civ.end}年` : `公元${civ.end}年`;
        const duration = civ.end - civ.start;
        document.getElementById('detailPeriod').textContent = `${startYear} - ${endYear} (历时${duration}年)`;

        document.getElementById('detailRegion').textContent = regionNames[civ.region] || civ.region;
        document.getElementById('detailDescription').textContent = civ.desc || '';

        const eventsList = document.getElementById('detailEvents');
        eventsList.innerHTML = '';
        if (civ.events) {
            civ.events.forEach(event => {
                const li = document.createElement('li');
                li.textContent = event;
                eventsList.appendChild(li);
            });
        }

        panel.classList.remove('hidden');
    }

    closeDetailPanel() {
        document.getElementById('detailPanel')?.classList.add('hidden');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new HistoryTimeline('timelineCanvas');
});
