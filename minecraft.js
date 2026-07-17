// 页面加载完成延迟弹出提示
window.addEventListener('load', function() {
    setTimeout(() => {
        alert("如果您第一次来到此网站，请务必阅读新手引导");
    }, 800);
});

// ========== 主题切换功能 ==========
const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggleBtn.addEventListener('click', function() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ========== 自定义光标 + 动态光效 ==========
(function() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    const glow = document.getElementById('cursorGlow');

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        glow.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.left = outlineX - 20 + 'px';
        outline.style.top = outlineY - 20 + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const hoverTargets = document.querySelectorAll('a, button, .back-btn, .theme-toggle, .file-item, .download-btn, .guide-btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => {
        dot.style.transform = 'scale(0.5)';
        outline.style.transform = 'scale(0.8)';
    });
    document.addEventListener('mouseup', () => {
        dot.style.transform = 'scale(1)';
        outline.style.transform = 'scale(1)';
    });
})();

// ========== 文件列表 ==========
const files = [
    { displayName: 'SURVIVAL_hmcl_1.21.11.exe(普通整合包)', icon: '📦', url: 'https://pan.huang1111.cn/s/byL59iY' },
    { displayName: 'idman642build63.exe(IDM 多线程下载器安装程序)', icon: '📥', url: 'https://pan.huang1111.cn/s/QzQgbcm' },
    { displayName: 'JiYuTrainer(极域管理程序)', icon: '🎮', url: 'https://pan.huang1111.cn/s/we9GxfK' },
    { displayName: 'Resourcepacks(资源包)', icon: '🖼️', url: 'https://pan.huang1111.cn/s/YLA3QsA' },
    { displayName: 'Shaderpacks(光影包)', icon: '☀️', url: 'https://pan.huang1111.cn/s/aEGznTG' },
    { displayName: 'Mods(模组)', icon: '🔧', url: 'https://pan.huang1111.cn/s/VLv2ntd' },
    { displayName: 'Datapacks(数据包)', icon: '📊', url: 'https://pan.huang1111.cn/s/XqbZXUl' },
    { displayName: 'BUILDING_hmcl_1.21.11.exe(建筑党整合包)', icon: '🏗️', url: 'https://pan.huang1111.cn/s/DVYA5f4' },
    { displayName: '1.21.11-Fabric.exe(含 Fabric 加载器的整合包)', icon: '🧵', url: 'https://pan.huang1111.cn/s/6el76SN' }
];

const fileListEl = document.getElementById('fileList');
files.forEach(file => {
    const li = document.createElement('li');
    li.className = 'file-item';
    li.innerHTML = `
        <div class="file-info">
            <div class="file-icon">${file.icon}</div>
            <div class="file-name">${file.displayName}</div>
        </div>
        <a class="download-btn" href="${file.url}" target="_blank">前往下载</a>
    `;
    fileListEl.appendChild(li);
});