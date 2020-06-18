# Fuji

简单的 Hugo 主题，支持夜间模式，Markdown 样式来自 GitHub Primer。

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![CODE SIZE](https://img.shields.io/github/languages/code-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [简体中文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

**v2 发布之后关于 lazyload 这一块可能会有较大的改动**，现在这样确实有些麻烦了。如果想修改主题配色的话，可以参考 [🔧 其他高级修改](#-其他高级修改)。

当前 i18n 支持语言：en, zh-hans, zh-hant, ja, nl。i18n 文件夹内为所有语言文件。

## 目录

- [💻 在线 Demo](#-在线-demo)
- [❗ 注意事项](#-注意事项)
- [🐣 开始使用](#-开始使用)
- [🆕 更新主题](#-更新主题)
- [⚙️ 自定义设置](#%EF%B8%8F-自定义设置)
  - [🎨 站点图标](#-站点图标)
  - [❌ License、目录和评论区](#-license目录和评论区)
  - [🎵 文章音乐](#-文章音乐)
  - [📷 图片放大的设置和 lazyload](#-图片放大的设置和-lazyload)
  - [⚓ Markdown 钩子](#-markdown-钩子)
  - [📨 评论区](#-评论区)
  - [🔧 其他高级修改](#-其他高级修改)
- [👓 批判一番和贡献代码](#-批判一番和贡献代码)
- [📝 License](#-license)
- [🤝 Annotations](#-annotations)

## 💻 在线 Demo

[**在线 Demo (英文)**](https://hugo-theme-fuji-demo.now.sh/) | [我的博客 (中文)](https://blog.amzrk2.cc/)

![Fuji 截图](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## ❗ 注意事项

记得给文章添加 [简介分隔线](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->`，以让文章列表的文章预览部分样式正确。

## 🐣 开始使用

添加主题：

```bash
$ git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

其他的可以看[官方指南](https://gohugo.io/overview/installing/)。

然后把 `exampleSite` 复制出来，并修改 `config.toml` 即可。

## 🆕 更新主题

可以 watch (release only) 这个 repo 来接收更新信息，master 分支不会频繁改动。

```bash
$ git submodule update --remote --merge
```

## ⚙️ 自定义设置

### 🎨 站点图标

使用 `[SITEROOT]/layouts/partials/favicon.html` 来覆盖主题自带的图标。

可以在 [realfavicongenerator.net](https://realfavicongenerator.net/) 快速创建自己的图标。

### ❌ License、目录和评论区

在全局的 `config.toml` 里设置：

```toml
showLicense = true # 对所有文章开关 License 显示
showToc = true # 对所有文章开关目录显示
```

在特定文章的 front matter 里设置：

```toml
showLicense = true # 对这篇文章开关 License 显示
showToc = true # 对这篇文章开关目录显示
```

除此之外你也可以关闭特定文章的评论：

```toml
showComments = false # 对这篇文章关闭评论
```

### 🎵 文章音乐

支持给文章单独添加 APlayer，在 front matter 里加上这些:

```toml
[[player]]
  playerName = "..." # 标题
  playerArtist = "..." # 作者
  playerURL = "..." # URL
  playerCover = "..." # 封面
[[player]]
  playerName = "..."
  playerArtist = "..."
  playerURL = "..."
  playerCover = "..."
```

### 📷 图片放大的设置和 lazyload

可放大，非 lazyload：

```markdown
![Alt text](test/example.png)
```

可放大，lazyload：

```html
{{< img-lazy "Alt text" "test/example.png" >}}
{{< img-lazy "row" "Alt text" "test/example.png" >}}
{{< img-lazy "col" "Alt text" "test/example.png" >}}
```

不可放大，非 lazyload，可选外链：

```html
{{< img-nz "Alt text" "test/example.png" ["https://example.com"] >}}
```

不可放大，lazyload，可选外链：

```html
{{< img-nz-lazy "Alt text" "test/example.png" ["https://example.com"] >}}
{{< img-nz-lazy "row" "Alt text" "test/example.png" ["https://example.com"] >}}
{{< img-nz-lazy "col" "Alt text" "test/example.png" ["https://example.com"] >}}
```

`img-lazy` 提供 16:9 的占位 svg，`img-lazy-row` 提供 32:9 的占位 svg，`img-lazy-col` 提供 8:9 的占位 svg。你也可以在 `config.toml` 里面自定义想要的占位图片和比例。

### ⚓ Markdown 钩子

具体内容看 [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks)，用于配置 Markdown 解释器。

比如你可以用 `[SITEROOT]/layouts/_default/_markup/render-link.html` 来修改文章里的链接是否在新页面打开：

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### 📨 评论区

主题支持三种评论系统，Disqus、utterances 和 DisqusJS (给大陆用户的)。

对于 Disqus 默认情况下使用 `{{ .Permalink }}` 作为 `url`，使用 `{{ .File.ContentBaseName }}` 作为 `identifier`。

使用 `[SITEROOT]/layouts/partials/comment-*.html` 来覆盖 `themes/fuji/layouts/partials/comment-*.html`。可在此文件内自定义指定的 url 和 identifier，或者为 DisqusJS 设置多个 api key 抑或是添加更多设置。注意如果使用 DisqusJS，将 `config.toml` 内的 `disqusJSApi` 解除注释来加载 CSS。

### 🔧 其他高级修改

见[批判一番和贡献代码](#批判一番和贡献代码)。

如果只是想修改主题色或者字体的话，在 `config.toml` 以下设置：

```toml
useHugoPipes = true
```

这将让 Hugo 使用 Hugo Pipes 来编译 SCSS，注意需要 Extended Version，然后就可以自己覆盖主题内的 SCSS 变量了。创建 `[SITEROOT]/assets/scss/_custom.scss`，可选项如下：

```scss
$body-font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN', 'Source Han Sans SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
$mono-font: 'Cascadia Code', 'SF Mono', 'Fira Code', 'Consolas', $body-font;
$title-font: 'Product Sans', $body-font;
$body-font-size: 16px;

$light-color-primary: #8aa2d3; // https://irocore.com/aofuji/
$light-color-secondary: #8f82bc; // https://irocore.com/fujimurasaki/
$light-color-focus: #3b469b; // https://irocore.com/aomurasaki/
$light-color-mute: #9ea1a3; // https://irocore.com/suzu-iro/
$light-color-font: #3f4551; // https://irocore.com/konnezu/
$light-color-divider: #e5e2e4; // https://irocore.com/komachinezu/
$light-color-bg: #fffffd; // https://irocore.com/shiro/
$light-color-codebg: #f6f8fa; // GitHub

$dark-color-primary: #8aa2d3; // https://irocore.com/aofuji/
$dark-color-secondary: #bab1df; // https://irocore.com/fujimurasaki/
$dark-color-focus: #e6e6e6; // https://irocore.com/shironezumi/
$dark-color-mute: #9ea1a3; // https://irocore.com/suzu-iro/
$dark-color-font: #c0c0c0; // https://irocore.com/gin-iro/
$dark-color-divider: #4d5158; // Discord
$dark-color-bg: #2f3136; // Discord
$dark-color-codebg: #414449; // GitHub
```

## 👓 批判一番和贡献代码

为了保证 `master` 分支干净，所有开发都是在 `dev` 分支进行的，记得对着 `dev` 分支批判。

[Issue](https://github.com/amzrk2/hugo-theme-fuji/issues)。主题本身只在 Firefox 上完整测试过，因此要是遇到了什么问题也可以随便批判。

进入主题目录，运行：

```bash
npm install
```

开发用：

```bash
npm run dev
```

最终发布用：

```bash
npm run build
```

## 📝 License

The theme is released under the ```Apache License 2.0```, for more information read the [License](https://github.com/amzrk2/hugo-theme-fuji/blob/master/LICENSE).

- [Primer CSS - MIT](https://github.com/primer/css/blob/master/LICENSE)
- [APlayer - MIT](https://github.com/MoePlayer/APlayer/blob/master/LICENSE)
- [lazysizes - MIT](https://github.com/aFarkas/lazysizes/blob/gh-pages/LICENSE)
- [DisqusJS - MIT](https://github.com/SukkaW/DisqusJS/blob/master/LICENSE)
- [ionicons - MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)
- [Fuse.js - Apache-2.0](https://github.com/krisk/Fuse/blob/master/LICENSE)
- [cloudflare-workers-async-google-analytics - MIT](https://github.com/SukkaW/cloudflare-workers-async-google-analytics/blob/master/LICENSE)
- [art-template - MIT](https://github.com/aui/art-template/blob/master/LICENSE)

> © 2020 DSRKafuU(amzrk2) [Twitter @amzrk2](https://twitter.com/amzrk2) [GitHub @amzrk2](https://github.com/amzrk2)

## 🤝 Annotations

Thanks to [community contributors](https://github.com/amzrk2/hugo-theme-fuji/graphs/contributors) for great help.

Learned a lot in [Sukka's Blog](https://blog.skk.moe/).
