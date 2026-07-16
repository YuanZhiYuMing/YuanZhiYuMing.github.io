(function() {
    'use strict';

    // ---------- 生成目录 ----------
    const content = document.getElementById('contentWrapper');
    const tocList = document.getElementById('tocList');

    // 收集所有标题（h2, h3, h4），h1 作为页面标题不加入目录
    const headings = content.querySelectorAll('h2, h3, h4');

    // 为没有 id 的标题生成 id
    headings.forEach(function(h) {
        if (!h.id) {
            // 用文本内容生成 id
            let raw = h.textContent.trim();
            // 移除特殊字符
            let id = raw.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            if (!id) id = 'section-' + Math.random().toString(36).substr(2, 6);
            h.id = id;
        }
    });

    // 构建目录树
    let tocHTML = '';
    headings.forEach(function(h) {
        const level = h.tagName.toLowerCase(); // 'h2', 'h3', 'h4'
        const text = h.textContent.trim();
        const id = h.id;

        let liClass = 'level-' + level;
        // 特殊处理：如果内容以数字开头，保留原样
        tocHTML += '<li><a href="#' + id + '" class="' + liClass + '" data-target="' + id + '">' + text + '</a></li>';
    });

    tocList.innerHTML = tocHTML;

    // ---------- 平滑滚动 & 高亮 ----------
    const tocLinks = tocList.querySelectorAll('a');
    const allHeadings = content.querySelectorAll('h2, h3, h4');

    // 点击目录链接平滑滚动
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                // 考虑侧边栏宽度，滚动到目标位置
                const offset = 20;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
                // 更新高亮
                updateActiveLink(targetId);
            }
        });
    });

    // 更新高亮
    function updateActiveLink(activeId) {
        tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === activeId) {
                link.classList.add('active');
                // 确保可见
                link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        });
    }

    // ---------- 滚动监听：高亮当前可见标题 ----------
    let scrollTimeout = null;

    function getVisibleHeading() {
        let minDist = Infinity;
        let closest = null;
        const scrollY = window.pageYOffset + 80; // 偏移量

        allHeadings.forEach(function(h) {
            const rect = h.getBoundingClientRect();
            const top = rect.top + window.pageYOffset;
            const dist = Math.abs(top - scrollY);
            if (dist < minDist) {
                minDist = dist;
                closest = h;
            }
        });

        // 如果距离太大，可能没有合适的，返回null
        if (minDist > 300) return null;
        return closest;
    }

    function onScroll() {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(function() {
            scrollTimeout = null;
            const visible = getVisibleHeading();
            if (visible) {
                updateActiveLink(visible.id);
            }
        }, 80);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // 初始高亮
    setTimeout(function() {
        const firstHeading = allHeadings[0];
        if (firstHeading) {
            updateActiveLink(firstHeading.id);
        }
    }, 100);
    console.log('✅ 新手引导页面加载完成');

})();