# 个人简历网站 — 搭建记录

## 项目概况

- **对象**：王国光，23岁，西南交通大学希望学院工程造价专业 2026 届应届毕业生
- **技术栈**：React 18 + Vite + CSS Modules（零额外依赖）
- **项目路径**：`D:\王国光\resume-website\`
- **启动命令**：`cd D:\王国光\resume-website && npm run dev` → http://localhost:5175/

## 设计系统

### 色调（简约暖色系）
| 角色 | 色值 | 用途 |
|------|------|------|
| 背景主色 | `#faf7f3` | 全局底色 |
| 卡片/内容 | `#ffffff` | 模块背景 |
| 主文字 | `#2c2416` | 标题、正文 |
| 次文字 | `#8c8276` | 描述性文字 |
| 强调色 | `#c49a6c`（暖铜色） | 标签、数字、边框高亮 |
| Footer | `#3a3026` | 底部深暖棕 |

### 排版
- 中文：`Noto Sans SC` / 英文数字：`Inter`（Google Fonts）
- 版心最大宽度：1700px，水平内边距：80px
- 章节垂直间距：160px

## 页面结构（7 个模块）

| 模块 | 文件路径 | 说明 |
|------|---------|------|
| **Navbar** | `src/components/Navbar/` | 固定顶部，Hero 区暖色字 + 透明底，滚动后白底毛玻璃 + 深色字 |
| **Hero** | `src/components/Hero/` | 全屏左文右图分栏（58/42），7rem 姓名，左侧金色竖线，滚动指示器 |
| **About** | `src/components/About/` | 左 280px 圆形头像占位 + 右个人信息，底部 4 个数据统计卡片 |
| **Projects** | `src/components/Projects/` | 2×2 大卡片网格，420px 图片区 + 横向滑动 + 点击弹窗预览 |
| **Strengths** | `src/components/Strengths/` | 3×2 能力卡片（📐BIM、🎨PS、🎤主持、📋合同、🤝协调、⚡抗压） |
| **Experience** | `src/components/Experience/` | 通用时间轴组件，校园经历 2 条 + 实习经历 2 条，圆点连线 + 卡片 |
| **Footer** | `src/components/Footer/` | 深暖棕背景，联系方式 + 版权 |

## 精选项目图片

图片存放于 `public/works/` 下四个子目录：

| 文件夹 | 项目 | 图片数 |
|--------|------|--------|
| `carnival/` | 2024 社团嘉年华 | 5 张（海报、易拉宝、节目单内外页） |
| `concert/` | 冬韵音乐会 | 5 张（正面、介绍页、节目页） |
| `menu/` | 严三婆洋芋饭菜单 | 1 张 |
| `festival/` | 社团文化节 | 2 张（主视觉、节目单） |

**功能**：卡片内横向滑动浏览 + 左右箭头按钮（hover 显示）+ 点击图片弹出全屏 Lightbox（键盘 ← → Esc 控制，底部缩略图条）。

### Lightbox 组件
- 文件：`src/components/Lightbox/Lightbox.jsx` + `.module.css`
- 黑色 92% 遮罩，图片自适应 75vw/75vh，左右箭头 + 底部缩略图导航
- 点击遮罩或 X 按钮关闭，`Esc` 键关闭

## 数据中心

所有简历内容集中在 `src/data/resume.js`，导出单个对象，包含：
- 基本信息（姓名、电话、邮箱、所在地）
- 教育背景、统计数据（stats 数组）
- 导航项（navItems）、项目列表（projects，含 folder + images 数组）
- 优势列表（strengths）、校园经历（campusExperience）、实习经历（internshipExperience）

## 组件通信模式

```
App.jsx
├── Navbar          (独立，useState 监听 scroll)
├── Hero            (独立，通过 resume 数据渲染)
├── About           (独立，通过 resume 数据渲染)
├── Projects        (管理 lightbox 状态，传递 onOpen 给 ProjectCard)
│   └── Lightbox    (受控组件，接收 images/index/onClose/onPrev/onNext/onNavigate)
├── Strengths       (独立，通过 resume 数据渲染)
├── Experience ×2   (复用组件，通过 props 传入不同数据)
└── Footer          (独立，通过 resume 数据渲染)
```

## 迭代历程

1. **初始化**：Vite 脚手架 + 目录结构 + 所有组件基础版本（深蓝黑 Hero）
2. **暖色系统一**：全局色表替换，Hero 从纯黑→暖米渐变，Footer 从蓝黑→暖棕
3. **Hero 重构**：居中单栏→左文右图分栏，字号 4.5rem→7rem，增加竖线装饰
4. **字体/居中尝试**（已回退）：曾尝试放大字体 + 居中布局，后撤回
5. **精选项目图片**：创建 `public/works/` 目录，卡片支持横向滑动 + 点击弹窗
6. **照片尝试**（已回退）：曾用 `照片.jpg` / `白底照片.jpg` 替换占位符，后撤回至 SVG 占位

## 当前状态

- ✅ 所有 7 个模块正常渲染
- ✅ 暖色系统一，版心 1700px
- ✅ 精选项目图片 + 横向滑动 + Lightbox 弹窗
- ✅ Hero / About 使用 SVG 占位符（待后续放入真实照片）
- ✅ 构建零错误

## 待优化

- Hero 和 About 的照片占位待替换为真实照片
- 可进一步调整字体大小与排版细节
- 可添加移动端响应式适配
