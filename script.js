// 小猫数据
let cat = {
    name: "",
    image: "",
    hunger: 0,
    happiness: 0,
    health: 100,
    isAdopted: false
};

// DOM元素
const catDisplay = document.getElementById('cat-display');
const adoptBtn = document.getElementById('adopt-btn');
const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const hungerDisplay = document.getElementById('hunger');
const happinessDisplay = document.getElementById('happiness');
const healthDisplay = document.getElementById('health');
const particlesContainer = document.getElementById('particles-container');

// 小猫图片数组
const catImages = [
    "c:\Users\HS\Desktop\x01.jpg",
    "c:\Users\HS\Desktop\x02.jpg",
    "c:\Users\HS\Desktop\x03.jpg",
    "c:\Users\HS\Desktop\x04.jpg",
    "c:\Users\HS\Desktop\x05.jpg",
    "c:\Users\HS\Desktop\x06.jpg",
    "c:\Users\HS\Desktop\x07.jpg",
    "c:\Users\HS\Desktop\x08.jpg"
];

// 表情粒子
const emojis = ["😊", "😍", "❤️", "🐟", "🎾", "🐱", "🥰"];

// 初始化游戏
function initGame() {
    adoptBtn.addEventListener('click', adoptCat);
    feedBtn.addEventListener('click', feedCat);
    playBtn.addEventListener('click', playWithCat);
    
    // 游戏循环
    setInterval(gameLoop, 3000);
}

// 游戏主循环
function gameLoop() {
    if (cat.isAdopted) {
        // 随时间增加饥饿度
        cat.hunger = Math.min(cat.hunger + 5, 100);
        
        // 饥饿度影响快乐度和健康度
        if (cat.hunger > 70) {
            cat.happiness = Math.max(cat.happiness - 3, 0);
            if (cat.hunger === 100) {
                cat.health = Math.max(cat.health - 2, 0);
            }
        }
        
        // 快乐度随时间缓慢下降
        cat.happiness = Math.max(cat.happiness - 1, 0);
        
        updateStats();
        checkCatStatus();
    }
}

// 领取小猫
function adoptCat() {
    if (!cat.isAdopted) {
        cat.isAdopted = true;
        cat.name = "小咪";
        cat.image = catImages[Math.floor(Math.random() * catImages.length)];
        cat.hunger = 20;
        cat.happiness = 50;
        cat.health = 100;
        
        catDisplay.innerHTML = `< img src="${cat.image}" alt="${cat.name}">`;
        adoptBtn.textContent = "已领取";
        adoptBtn.disabled = true;
        feedBtn.disabled = false;
        playBtn.disabled = false;
        
        updateStats();
        createParticles(5, "😻");
    }
}

// 喂养小猫
function feedCat() {
    if (cat.isAdopted) {
        cat.hunger = Math.max(cat.hunger - 30, 0);
        cat.happiness = Math.min(cat.happiness + 10, 100);
        updateStats();
        createParticles(3, "🐟");
    }
}

// 与小猫玩耍
function playWithCat() {
    if (cat.isAdopted) {
        cat.happiness = Math.min(cat.happiness + 20, 100);
        cat.hunger = Math.min(cat.hunger + 10, 100);
        updateStats();
        createParticles(5, "🎾");
    }
}

// 更新状态显示
function updateStats() {
    hungerDisplay.textContent = cat.hunger;
    happinessDisplay.textContent = cat.happiness;
    healthDisplay.textContent = cat.health;
    
    // 根据状态改变颜色
    if (cat.hunger > 70) hungerDisplay.style.color = "red";
    else if (cat.hunger > 40) hungerDisplay.style.color = "orange";
    else hungerDisplay.style.color = "green";
    
    if (cat.happiness < 30) happinessDisplay.style.color = "red";
    else if (cat.happiness < 60) happinessDisplay.style.color = "orange";
    else happinessDisplay.style.color = "green";
    
    if (cat.health < 50) healthDisplay.style.color = "red";
    else if (cat.health < 80) healthDisplay.style.color = "orange";
    else healthDisplay.style.color = "green";
}

// 检查小猫状态
function checkCatStatus() {
    if (cat.health <= 0) {
        catDisplay.innerHTML = "<p>小猫生病了，请好好照顾它！</p >";
    } else if (cat.happiness < 20) {
        catDisplay.innerHTML = `< img src="${cat.image}" alt="${cat.name}" style="filter: grayscale(50%)">`;
    }
}

// 创建粒子特效
function createParticles(count, emoji = null) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 使用随机emoji或传入的emoji
        const useEmoji = emoji || emojis[Math.floor(Math.random() * emojis.length)];
        particle.textContent = useEmoji;
        
        // 随机位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // 随机动画延迟
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesContainer.appendChild(particle);
        
        // 动画结束后移除
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// 启动游戏
initGame();