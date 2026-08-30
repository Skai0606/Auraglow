# AURAGLOW — 化妆品品牌首页 · 概念演示

品牌：**AURAGLOW** · 标语：BOLD, AFFORDABLE, HIGH-QUALITY BEAUTY
目标市场：美国 B2C 彩妆 · 风格：高级简约暖调（象牙白 / 深可可 / 香槟金）· 衬线标题 + 现代无衬线正文

## 本版改造内容（ZINGHUE → AURAGLOW）

- 全站品牌名、标语、文案替换为 AURAGLOW 品牌调性（Bold Beauty For Everyone / Glow Your Own Way）
- 首页轮播替换为两张 AURAGLOW 品牌 banner（`assets/img/hero-banner-1.png` / `hero-banner-2.png`），轮播由 3 张改为 2 张
- Header / Footer 使用 AURAGLOW 官方 logo（`assets/img/logo-dark.png`，深色底自动反白）
- 整体配色由高饱和粉紫改为高级简约暖调：象牙白背景、深可可棕、香槟金强调色、柔和裸粉
- 字体升级：标题 Cormorant Garamond（衬线）、正文 Jost（无衬线），Google Fonts 引入
- favicon 重做为 AURAGLOW 风格（深棕底 + 香槟金 "A" 光圈）

## ⚠️ 重要：当前图片状态

- 除首页轮播两张 banner 外，其余照片仍是**占位视觉素材**（SHEGLAM 参考图），未做商用授权处理。
- 该版本仅用于内部看版型/流程，**禁止公开商用**。上线前必须全部替换为原创或有合法授权的图片。

## 图片素材映射

| 用途 | 当前文件 |
| --- | --- |
| 首页轮播 2 张（AURAGLOW 品牌 banner） | assets/img/hero-banner-1.png / hero-banner-2.png |
| 品牌 logo（深色版） | assets/img/logo-dark.png |
| 分类图（脸/眼/唇） | assets/img/img_17.jpg / img_31.jpg / img_32.jpg |
| 商品图 ×8 | assets/img/img_18 / 24 / 26 / 27 / 33 / 34 / 41 / 43 .jpg |
| 中部促销横幅 | assets/img/img_49.jpg |
| 品牌故事大图 | assets/img/img_25.jpg |
| 买家秀 ×4 | assets/img/img_20 / 22 / 29 / 30 .jpg |
| 价值观 4 图 | assets/img/img_13 / 15 / 16 / 44 .jpg |

## 已实现功能

- 响应式首页（桌面 1440 / 手机 390）
- 大图轮播：自动播放 5.2s、箭头、圆点切换（自动适配 slide 数量）
- 商品网格：促销标签、收藏、色号、QUICK ADD
- 购物车抽屉：加减数量、删除、合计、模拟结算
- 搜索：实时过滤、热门词快捷筛选
- 邮箱订阅（模拟）、移动端全屏菜单、跑马灯、锚点平滑滚动

## 预览截图说明

- `preview-desktop.png` / `preview-mobile.png` 为改造前（ZINGHUE 旧版）截图，已过时，仅供对照，不代表当前 AURAGLOW 版本外观。

## 本地运行

```bash
npx serve .        # 或任意静态服务器，如 python -m http.server 4173
```

然后浏览器打开 http://127.0.0.1:4173 ；或直接双击 `index.html` 查看静态版。

