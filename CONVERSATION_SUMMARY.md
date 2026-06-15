# 简历网站修改摘要

## 项目信息
- **项目路径**: `D:\王国光\resume-website`
- **技术栈**: React 18 + Vite + CSS Modules + GSAP
- **部署方式**: GitHub Pages (`import.meta.env.BASE_URL`)

---

## 一、Hero 头部 — 弹跳小球动画

### 实现内容
- 黑色磨砂玻璃小球从顶部中心下落，依次弹跳撞击 4 条横线，每次撞击揭示一个文字（个、人、简、历）
- 动画完成后顶部淡入姓名 "王国光" 和副标题
- 使用 Web Animations API (`element.animate()`)，非 GSAP

### 关键参数
- 小球: 30px, 3D 径向渐变（深色球体 + 白色高光）
- 横线: 140px × 2px, 居中于 50vh
- 字符: Playfair Display / 思源宋体, clamp(2.8rem, 6vw, 5rem)
- 身份区: top: 7vh
- 弹跳高度: 80px, 弧顶: 70px, 微弹: 22px

### 涉及文件
- `src/components/Hero/Hero.jsx` — 动画逻辑 + 组件
- `src/components/Hero/Hero.module.css` — 所有样式
- `index.html` — 新增 Playfair Display, Noto Serif SC 字体

---

## 二、About 第二页 — 个人信息

### Stats 卡片（头像下方四个方框）
三层信息结构:
| 卡片 | 数值 | 标签 | 副行 |
|------|------|------|------|
| 1 | 20+ | 主持活动场次 | 场均人数200+ |
| 2 | 8场 | 大型学校活动 | 场均人数800+ |
| 3 | 30+ | 海报设计 | 拥有丰富的设计经验 |
| 4 | 2段 | 实习经历 | 熟练使用各种办公软件 |

当前字号:
- 数值: 4.2rem, 金色, 粗体
- 标签: 1.8rem, 深色
- 副行: 1.3rem, 灰色

### 涉及文件
- `src/data/resume.js` — stats 数组含 sub 字段
- `src/components/About/About.jsx` — 渲染 + 滚动动画
- `src/components/About/About.module.css` — 样式

### 字体（方框外部）
- 教育信息 `.bio`: 1.1rem
- 个人简介 `.bioSecondary`: 1.05rem
- 联系方式 `.contactItem`: 1rem
- 全局 `.section-label`: 0.85rem
- 全局 `.section-title`: 2.8rem

---

## 三、页面顺序调整

最终页面顺序:
1. 首页 (Hero)
2. 关于 (About)
3. 校园经历 (Experience — campus)
4. 实习经历 (Experience — internship)
5. 个人优势 (Strengths)
6. 精选项目 (Projects)

### 涉及文件
- `src/App.jsx` — 组件排列顺序
- `src/data/resume.js` — navItems 导航顺序

---

## 四、滚动动画

### 动画系统
- `src/animations/scrollReveal.js` — GSAP ScrollTrigger 封装
  - `revealSectionHeader()` — 标题/标签/描述入场
  - `staggerCards()` — 卡片错峰入场
  - `revealTimeline()` — 时间线逐项展示
- About 页额外动画: `bioSecondary` + `contactItem` 在 useEffect 中独立设置

---

## 五、当前状态

- ✅ 所有修改已完成并通过 `npx vite build`
- ⚠️ 尚未部署到 GitHub Pages
- ⚠️ 262MB PSD 文件仍需手动 Photoshop 导出

---

## 六、关键文件清单

```
src/
├── App.jsx                          # 主组件（页面顺序）
├── data/resume.js                   # 数据（stats, navItems）
├── styles/global.css                # 全局样式（section-label, section-title）
├── animations/scrollReveal.js       # 滚动动画
├── components/
│   ├── Hero/Hero.jsx                # 弹跳小球动画
│   ├── Hero/Hero.module.css         # Hero 样式
│   ├── About/About.jsx              # 关于页 + 滚动动画
│   ├── About/About.module.css       # 关于页样式（stats 卡片等）
│   ├── Projects/Projects.jsx        # 精选项目
│   ├── Strengths/Strengths.jsx      # 个人优势
│   ├── Experience/Experience.jsx    # 经历时间线
│   ├── Navbar/Navbar.jsx            # 导航栏
│   └── Footer/Footer.jsx            # 页脚
└── index.html                       # 字体引入
```
