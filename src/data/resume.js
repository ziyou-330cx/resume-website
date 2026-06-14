const resume = {
  name: '王国光',
  nameEn: 'Wang Guoguang',
  age: 23,
  phone: '18282937791',
  email: '2375335424@qq.com',
  location: '成都市',
  title: '工程造价 · 应届毕业生',
  tagline: '西南交通大学希望学院 2026 届毕业生，兼具工程造价专业背景与出色的组织策划、视觉设计能力。',

  education: {
    school: '西南交通大学希望学院',
    major: '工程造价',
    degree: '本科',
    period: '2022.09 - 2026.06',
  },

  stats: [
    { value: '20+', label: '主持活动场次' },
    { value: '8', label: '校级大型活动' },
    { value: '800+', label: '场均参与人数' },
    { value: '2', label: '段实习经历' },
  ],

  navItems: [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '项目', href: '#projects' },
    { label: '优势', href: '#strengths' },
    { label: '经历', href: '#experience' },
  ],

  projects: [
    {
      title: '2024 社团嘉年华',
      description: '主视觉设计、易拉宝、宣传海报，从创意构思到落地输出全程独立完成',
      gradient: 'linear-gradient(135deg, #c49a6c 0%, #a0784a 100%)',
      folder: 'carnival',
      images: [
        '社团嘉年华宣传海报.jpg',
        '社团嘉年华易拉宝.jpg',
        '社团嘉年华海报.jpg',
        '社团嘉年华节目单内页.jpg',
        '社团嘉年华节目单外页.jpg',
      ],
    },
    {
      title: '冬韵音乐会',
      description: '节目单系列设计，精致排版与色彩搭配，营造冬日音乐氛围',
      gradient: 'linear-gradient(135deg, #d4b896 0%, #b8946c 100%)',
      folder: 'concert',
      images: [
        '音乐会正面.jpg',
        '音乐会介绍1.jpg',
        '音乐会介绍2.jpg',
        '音乐会节目1.jpg',
        '音乐会节目2.jpg',
      ],
    },
    {
      title: '严三婆洋芋饭 · 菜单设计',
      description: '校园餐厅菜单版式设计，兼顾信息层次与视觉吸引力',
      gradient: 'linear-gradient(135deg, #e8d5c0 0%, #c49a6c 100%)',
      folder: 'menu',
      images: [
        '严三婆洋芋饭菜单.jpg',
      ],
    },
    {
      title: '社团文化节',
      description: '活动整体视觉包装，包括主 KV、现场物料、线上宣传素材',
      gradient: 'linear-gradient(135deg, #a08060 0%, #c49a6c 100%)',
      folder: 'festival',
      images: [
        '社团文化节.jpg',
        '社团文化节节目单.jpg',
      ],
    },
  ],

  strengths: [
    {
      icon: '📐',
      title: 'BIM / CAD 技能',
      description: '持有 BIM 一级、CAD 一级技能证书，熟练运用计算机辅助工程造价',
    },
    {
      icon: '🎨',
      title: '平面设计',
      description: '精通 Adobe Photoshop，独立完成海报、菜单、手册等平面设计作品',
    },
    {
      icon: '🎤',
      title: '主持与控场',
      description: '20+ 场大型婚礼主持经验，精准控场，零失误，临场反应敏捷',
    },
    {
      icon: '📋',
      title: '工程合同管理',
      description: '熟悉合同台账搭建、变更签证处理、结算资料汇编等核心流程',
    },
    {
      icon: '🤝',
      title: '组织协调',
      description: '统筹 32 个社团资源，主导多场 800+ 人大型校园活动',
    },
    {
      icon: '⚡',
      title: '学习与抗压',
      description: '快速适应高强度节奏，做事严谨细致，立志为企业创造实效',
    },
  ],

  campusExperience: [
    {
      period: '2023.09 - 2024.06',
      role: '企划宣传部部长',
      org: '大学生社团管理服务中心',
      highlights: [
        '策划并主导两场校级大型活动（社团文化节、社团嘉年华），策划并主持第一届诗词大会',
        '负责大型讲座及禁毒志愿活动（金堂县）的宣传与组织',
        '统筹设计制作活动主视觉、易拉宝、节目单等宣传物料，熟练运用 Photoshop 完成平面设计',
        '协调校团委与 32 个社团的资源调度，保障活动审批与执行',
        '任部长期间组织全校活动 8 场，平均每场参与 800+ 人',
      ],
    },
    {
      period: '2022.09 - 2023.06',
      role: '辅导员助理',
      org: '西南交通大学希望学院',
      highlights: [
        '负责班会方案策划与 PPT 制作，辅助班会组织及重点内容传达',
        '整理学生基本信息、学业情况、奖惩记录，优化分类归档，支撑辅导员精准管理',
      ],
    },
  ],

  internshipExperience: [
    {
      period: '2025.09 - 2026.01',
      role: '商务管理实习生',
      org: '上海宝冶集团有限公司成都分公司',
      highlights: [
        '合同资料管理：负责工程合同、签证单、材料价格资料的收集、分类、归档，搭建商务台账',
        '工程结算辅助：协助竣工结算、进度结算，完成工程量核对、造价核价，汇编全套结算资料',
        '工程造价实操：依据施工图独立完成基础工程量计算、清单核对与简易计价，熟悉算量流程及现场造价标准',
      ],
    },
    {
      period: '2023.02 - 2024.06',
      role: '婚礼主持',
      org: '成都适言文化传媒有限公司',
      highlights: [
        '完成 20+ 场大型主持活动（单场 200+ 人），精准控场，灵活应对突发状况，零失误',
        '对接婚庆公司及新人，统筹全流程，整合摄影、场控等资源',
        '善于调动氛围，提升来宾满意度，具备感染力与亲和力',
      ],
    },
  ],

  courses: '商务与经济统计、工程力学、建筑工程制图与识图、平法识图与钢筋计算、工程定额原理与清单计价、建筑与装饰工程计量、市政工程计量与计价、工程造价管理、工程合同管理、工程法原理与实务、计算机辅助工程造价、BIM技术应用、房屋建筑学',
};

export default resume;
