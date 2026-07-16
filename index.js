alert("如果您第一次来到此网站，请务必阅读新手引导")
const files = [
    { name: 'JiYuTrainer.exe', icon: '🎮', ext: '极域管理程序' , isExternal: true, url: 'https://pan.huang1111.cn/s/we9GxfK' },
    { name: 'idman642build63.exe', icon: '📥', ext: 'IDM多线程下载器' , isExternal: true, url: 'https://pan.huang1111.cn/s/QzQgbcm' },
    { name: 'Survival_hmcl_1.21.11.exe', icon: '📦', ext: '我的世界启动器包', isExternal: true, url: 'https://pan.huang1111.cn/s/byL59iY' },
];

const fileListEl = document.getElementById('fileList');

files.forEach(file => {
    const li = document.createElement('li');
    li.className = 'file-item';
    if (file.isExternal) {
        li.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">${file.icon}</div>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-ext">${file.ext}</div>
                        </div>
                    </div>
                    <a class="download-btn" href="${file.url}" target="_blank">前往下载</a>
                `;
    } else {
        li.innerHTML = `
                    <div class="file-info">
                        <div class="file-icon">${file.icon}</div>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-ext">${file.ext}</div>
                        </div>
                    </div>
                    <a class="download-btn" href="${rawBase + encodeURIComponent(file.name)}" download="${file.name}">下载</a>
                `;
    }
    fileListEl.appendChild(li);
});