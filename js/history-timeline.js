// 世界历史时间线 - 精确复刻纸质版

class HistoryTimeline {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // 时间范围
        this.minYear = -3500;
        this.maxYear = 2024;
        this.totalYears = this.maxYear - this.minYear;

        // 视图参数
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;

        // 布局参数
        this.contentWidth = 920;  // 内容总宽度
        this.yearPixelRatio = 0.13; // 每年多少像素

        // 交互状态
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        this.hoveredItem = null;

        // 数据
        this.data = historyData.civilizations;
        this.filteredData = [...this.data];

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEvents();
        this.fitToScreen();
        this.draw();
    }

    resizeCanvas() {
        const wrapper = this.canvas.parentElement;
        this.canvas.width = wrapper.clientWidth;
        this.canvas.height = wrapper.clientHeight;
    }

    fitToScreen() {
        const contentHeight = this.totalYears * this.yearPixelRatio;

        // 计算适合屏幕的缩放
        const padX = 60, padY = 40;
        const scaleX = (this.canvas.width - padX) / this.contentWidth;
        const scaleY = (this.canvas.height - padY) / contentHeight;

        this.scale = Math.min(scaleX, scaleY);

        // 居中
        this.offsetX = (this.canvas.width - this.contentWidth * this.scale) / 2;
        this.offsetY = padY / 2;
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.fitToScreen();
            this.draw();
        });

        // 鼠标事件
        this.canvas.addEventListener('mousedown', e => {
            this.isDragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.canvas.style.cursor = 'grabbing';
        });

        this.canvas.addEventListener('mousemove', e => {
            const rect = this.canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            if (this.isDragging) {
                this.offsetX += e.clientX - this.lastX;
                this.offsetY += e.clientY - this.lastY;
                this.lastX = e.clientX;
                this.lastY = e.clientY;
                this.draw();
            } else {
                const item = this.hitTest(mx, my);
                if (item !== this.hoveredItem) {
                    this.hoveredItem = item;
                    this.canvas.style.cursor = item ? 'pointer' : 'grab';
                    this.draw();
                }
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isDragging = false;
        });

        this.canvas.addEventListener('wheel', e => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = Math.max(0.5, Math.min(10, this.scale * delta));

            this.offsetX = mx - (mx - this.offsetX) * (newScale / this.scale);
            this.offsetY = my - (my - this.offsetY) * (newScale / this.scale);
            this.scale = newScale;

            this.draw();
        });

        this.canvas.addEventListener('click', e => {
            const rect = this.canvas.getBoundingClientRect();
            const item = this.hitTest(e.clientX - rect.left, e.clientY - rect.top);
            if (item) this.showDetail(item);
        });

        // 触摸事件
        this.canvas.addEventListener('touchstart', e => {
            e.preventDefault();
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.lastX = e.touches[0].clientX;
                this.lastY = e.touches[0].clientY;
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
            if (this.isDragging && e.touches.length === 1) {
                this.offsetX += e.touches[0].clientX - this.lastX;
                this.offsetY += e.touches[0].clientY - this.lastY;
                this.lastX = e.touches[0].clientX;
                this.lastY = e.touches[0].clientY;
                this.draw();
            }
        }, { passive: false });

        this.canvas.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // 控制按钮
        document.getElementById('resetZoom')?.addEventListener('click', () => {
            this.fitToScreen();
            this.draw();
        });

        document.getElementById('closeDetail')?.addEventListener('click', () => {
            document.getElementById('detailPanel')?.classList.add('hidden');
        });
    }

    yearToY(year) {
        return (year - this.minYear) * this.yearPixelRatio;
    }

    hitTest(mx, my) {
        const wx = (mx - this.offsetX) / this.scale;
        const wy = (my - this.offsetY) / this.scale;

        for (const civ of this.filteredData) {
            const y1 = this.yearToY(civ.start);
            const y2 = this.yearToY(civ.end);
            const h = Math.max(y2 - y1, 4);

            if (wx >= civ.x && wx <= civ.x + civ.w && wy >= y1 && wy <= y1 + h) {
                return civ;
            }
        }
        return null;
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 米色背景
        ctx.fillStyle = '#fdf6e3';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        ctx.translate(this.offsetX, this.offsetY);
        ctx.scale(this.scale, this.scale);

        this.drawGrid();
        this.drawCivs();

        ctx.restore();
    }

    drawGrid() {
        const ctx = this.ctx;

        // 绘制年份刻度
        ctx.textAlign = 'right';
        ctx.font = '7px Arial';

        for (let year = -3500; year <= 2024; year += 500) {
            const y = this.yearToY(year);

            // 淡色横线
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(-40, y);
            ctx.lineTo(this.contentWidth, y);
            ctx.stroke();

            // 年份标签
            ctx.fillStyle = '#aaa';
            const label = year < 0 ? `${-year}BC` : year === 0 ? '0' : `${year}AD`;
            ctx.fillText(label, -5, y + 2);
        }
    }

    drawCivs() {
        const ctx = this.ctx;

        for (const civ of this.filteredData) {
            const x = civ.x;
            const y1 = this.yearToY(civ.start);
            const y2 = this.yearToY(civ.end);
            const w = civ.w;
            const h = Math.max(y2 - y1, 4);

            // 填充颜色
            let color = civ.color;
            if (this.hoveredItem === civ) {
                color = this.lighten(civ.color, 25);
            }

            // 绘制矩形
            ctx.fillStyle = color;
            ctx.fillRect(x, y1, w, h);

            // 边框
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y1, w, h);

            // 文字
            this.drawText(civ, x, y1, w, h);
        }
    }

    drawText(civ, x, y, w, h) {
        const ctx = this.ctx;
        if (h < 5) return;

        const cx = x + w / 2;
        const cy = y + h / 2;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 字体大小根据方块大小调整
        let fontSize = Math.min(9, Math.max(4, w / 7, h / 4));

        // 文字阴影
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 0.5;
        ctx.shadowOffsetY = 0.5;

        // 中文名
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${fontSize}px "Microsoft YaHei", "PingFang SC", Arial`;

        let name = civ.name;
        if (ctx.measureText(name).width > w - 2) {
            while (ctx.measureText(name).width > w - 2 && name.length > 1) {
                name = name.slice(0, -1);
            }
        }
        ctx.fillText(name, cx, cy - (h > 12 ? 3 : 0));

        // 英文名（如果空间够）
        if (h > 12 && w > 30) {
            ctx.font = `${fontSize * 0.55}px Arial`;
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
            let en = civ.nameEn || '';
            if (ctx.measureText(en).width > w - 2) {
                while (ctx.measureText(en).width > w - 2 && en.length > 1) {
                    en = en.slice(0, -1);
                }
            }
            ctx.fillText(en, cx, cy + fontSize * 0.6);
        }

        // 年份（如果空间够）
        if (h > 20 && w > 35) {
            ctx.font = `${fontSize * 0.45}px Arial`;
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            const s = civ.start < 0 ? `${-civ.start}BC` : `${civ.start}`;
            const e = civ.end < 0 ? `${-civ.end}BC` : `${civ.end}`;
            ctx.fillText(`${s}-${e}`, cx, cy + fontSize * 1.2);
        }

        // 重置阴影
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }

    lighten(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.min(255, (num >> 16) + Math.round(2.55 * percent));
        const g = Math.min(255, ((num >> 8) & 0xFF) + Math.round(2.55 * percent));
        const b = Math.min(255, (num & 0xFF) + Math.round(2.55 * percent));
        return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
    }

    showDetail(civ) {
        const panel = document.getElementById('detailPanel');
        if (!panel) return;

        const title = document.getElementById('detailTitle');
        title.textContent = `${civ.name} ${civ.nameEn || ''}`;
        title.style.background = `linear-gradient(135deg, ${civ.color}, ${this.lighten(civ.color, -20)})`;

        const startStr = civ.start < 0 ? `公元前${-civ.start}年` : `公元${civ.start}年`;
        const endStr = civ.end < 0 ? `公元前${-civ.end}年` : `公元${civ.end}年`;
        document.getElementById('detailPeriod').textContent =
            `${startStr} — ${endStr}（${civ.end - civ.start}年）`;

        document.getElementById('detailRegion').textContent = regionNames[civ.region] || civ.region;
        document.getElementById('detailDescription').textContent = civ.desc || '';

        const list = document.getElementById('detailEvents');
        list.innerHTML = '';
        (civ.events || []).forEach(ev => {
            const li = document.createElement('li');
            li.textContent = ev;
            list.appendChild(li);
        });

        panel.classList.remove('hidden');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new HistoryTimeline('timelineCanvas');
});
