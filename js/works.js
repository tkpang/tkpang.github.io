/**
 * TK Works - 作品集交互脚本
 * 功能：分类筛选、动画效果
 */

(function() {
    'use strict';

    // 作品集管理类
    class WorksManager {
        constructor() {
            this.filterTags = document.querySelectorAll('.filter-tag');
            this.workCards = document.querySelectorAll('.work-card');
            this.init();
        }

        init() {
            // 绑定筛选标签点击事件
            this.filterTags.forEach(tag => {
                tag.addEventListener('click', (e) => this.handleFilter(e));
            });

            // 添加淡入动画
            this.addFadeInAnimation();

            // 图片懒加载
            this.setupLazyLoading();
        }

        /**
         * 处理筛选事件
         */
        handleFilter(event) {
            const filterValue = event.target.dataset.filter;

            // 更新激活状态
            this.filterTags.forEach(tag => tag.classList.remove('active'));
            event.target.classList.add('active');

            // 筛选作品卡片
            this.workCards.forEach(card => {
                const category = card.dataset.category;

                if (filterValue === 'all') {
                    // 显示所有
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                } else if (category === filterValue) {
                    // 显示匹配的
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                } else {
                    // 隐藏不匹配的
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                }
            });

            // 平滑滚动到作品区域
            const worksGrid = document.querySelector('.works-grid');
            if (worksGrid && filterValue !== 'all') {
                setTimeout(() => {
                    worksGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }

        /**
         * 添加淡入动画
         */
        addFadeInAnimation() {
            // 使用Intersection Observer实现滚动淡入
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1
                });

                this.workCards.forEach(card => {
                    observer.observe(card);
                });
            } else {
                // 不支持的浏览器直接显示
                this.workCards.forEach(card => {
                    card.classList.add('fade-in');
                });
            }
        }

        /**
         * 图片懒加载
         */
        setupLazyLoading() {
            if ('loading' in HTMLImageElement.prototype) {
                // 浏览器原生支持lazy loading
                return;
            }

            // 使用Intersection Observer实现懒加载
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            imageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new WorksManager();
        });
    } else {
        new WorksManager();
    }

    // 返回顶部功能
    function setupBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2563eb;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        `;

        document.body.appendChild(backToTopBtn);

        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
            }
        });

        // 点击返回顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 悬停效果
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.background = '#1d4ed8';
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.background = '#2563eb';
        });
    }

    // 初始化返回顶部按钮
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupBackToTop);
    } else {
        setupBackToTop();
    }

})();
