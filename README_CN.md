# 🍥 Fuji 🍥

简单的 Hugo 主题，支持夜间模式，Markdown 样式来自 GitHub Primer。

![GitHub release](https://img.shields.io/github/v/release/dsrkafuu/hugo-theme-fuji)
![GitHub build status](https://img.shields.io/github/workflow/status/dsrkafuu/hugo-theme-fuji/build-test)
![GitHub license](https://img.shields.io/github/license/dsrkafuu/hugo-theme-fuji)

[English](https://github.com/dsrkafuu/hugo-theme-fuji#readme) | [简体中文](https://github.com/dsrkafuu/hugo-theme-fuji/blob/master/README_CN.md)

> 介绍一个全新的亮色 VSCode 主题 [Aofuji Light Theme](https://github.com/dsrkafuu/vscode-theme-aofuji)，它的配色方案继承自 [Aofuji](https://github.com/amzrk2/hugo-template-aofuji)！

支持的 i18n 语言：`cs`, `de`, `en`, `eo`, `fr`, `ja`, `nl`, `pl`, `pt-pt`, `zh-hans`, `zh-hant`。i18n 文件夹内为所有语言文件。

## 目录

- [💻 在线 Demo](#-在线-demo)
- [❗ 注意事项](#-注意事项)
- [🐣 开始使用](#-开始使用)
- [🆕 更新主题](#-更新主题)
- [⚙️ 自定义设置](#%EF%B8%8F-自定义设置)
  - [🎨 站点图标](#-站点图标)
  - [❌ License、目录和评论区](#-license目录和评论区)
  - [🎵 文章音乐](#-文章音乐)
  - [📐 LaTeX 渲染](#-latex-渲染)
  - [📷 图片放大的设置和 lazyload](#-图片放大的设置和-lazyload)
  - [⚓ Markdown 钩子](#-markdown-钩子)
  - [📨 评论区](#-评论区)
  - [🔧 自定义 CSS](#-自定义-css)
- [👓 批判一番和贡献代码](#-批判一番和贡献代码)
- [📝 License](#-license)
- [🤝 Annotations](#-annotations)

## 💻 在线 Demo

[**Live Demo (gohugo.io)**](https://themes.gohugo.io/theme/hugo-theme-fuji/)

![Fuji 截图](https://raw.githubusercontent.com/dsrkafuu/hugo-theme-fuji/master/images/screenshot.png)

## ❗ 注意事项

记得给文章添加 [简介分隔线](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->`，以让文章列表的文章预览部分样式正确。

## 🐣 开始使用

添加主题：

```bash
git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

其他的可以看[官方指南](https://gohugo.io/overview/installing/)。

然后把 `exampleSite` 复制出来，并修改 `config.toml` 即可。注意这个文件内包含了所有使站点正常工作所需的配置项 (比如搜索页面的配置)，因此将其当作参考是一个比较好的选择。

## 🆕 更新主题

可以 watch (release only) 这个 repo 来接收更新信息，master 分支不会频繁改动。

```bash
git submodule update --remote --merge
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

In-post APlayer supported, you use the `aplayer` shortcode:

```txt
{{< aplayer urls="/aplayer/fluid.mp3" names="Fluid" artists="Crowander" covers="/aplayer/crowander.jpg" >}}
```

Checkout the `exampleSite/content/post/aplayer-test.md` for more example usage such as using multiple files.

### 📐 LaTeX 渲染

You can write LaTeX directly in markdown with escape characters:

<!-- prettier-ignore -->
```txt
$$
\begin{matrix}
  a & b \\\\ c & d
\end{matrix}
$$
```

Or use the short code, display style:

<!-- prettier-ignore -->
```txt
{{< math >}}
\begin{matrix}
  a & b \\
  c & d
\end{matrix}
{{< /math >}}
```

Inline style:

<!-- prettier-ignore -->
```txt
{{< math "inline" >}}
\begin{matrix}
  a & b \\
  c & d
\end{matrix}
{{< /math >}}
```

Don't forget to add `math = true` in your front matter or `config.toml`.

### 📷 图片放大的设置和 lazyload

可放大，非 lazyload：

```markdown
![Alt text](test/example.png)
```

可放大，lazyload：

<!-- prettier-ignore -->
```html
{{< img-lazy "16x9" "Alt text here" "test/example.png" >}}
```

不可放大，非 lazyload，可选外链：

<!-- prettier-ignore -->
```html
{{< img-nz "Alt text here" "test/example.png" >}}
```

不可放大，lazyload，可选外链：

<!-- prettier-ignore -->
```html
{{< img-nz-lazy "16x9" "Alt text here" "test/example.png" >}}
```

可用的占位符比例:

- 40x9
- 32x9
- 21x9
- 18x9
- 16x9
- 16x10
- 3x2
- 4x3
- 1x1
- 3x4
- 2x3
- 10x16
- 9x16
- 9x18
- 9x21
- 9x32

### ⚓ Markdown 钩子

具体内容看 [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks)，用于配置 Markdown 解释器。

比如你可以用 `[SITEROOT]/layouts/_default/_markup/render-link.html` 来修改文章里的链接是否在新页面打开：

<!-- prettier-ignore -->
```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### 📨 评论区

主题支持三种评论系统，Disqus、utterances 和 DisqusJS (给大陆用户的)。

对于 Disqus 默认情况下使用 `{{ .Permalink }}` 作为 `url`，使用 `{{ .File.ContentBaseName }}` 作为 `identifier`。

使用 `[SITEROOT]/layouts/partials/comment-*.html` 来覆盖 `themes/fuji/layouts/partials/comment-*.html`。可在此文件内自定义指定的 url 和 identifier，或者为 DisqusJS 设置多个 api key 抑或是添加更多设置。注意如果使用 DisqusJS，将 `config.toml` 内的 `disqusJSApi` 解除注释来加载 CSS。

### 🔧 自定义 CSS

> 需要 Hugo Extended Version。

You can override theme's internal SCSS variables with your own. Create `[SITEROOT]/assets/scss/_custom_var.scss` to cover variables in SCSS.

Variables available:

```scss
$body-font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Helvetica',
  'Arial', 'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans CN', 'Source Han Sans SC',
  'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
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

To override SCSS rules, create `[SITEROOT]/assets/scss/_custom_rules.scss`. This file will have priority over anything regarding CSS rules, but is useless for changing variables that are used elsewhere in the theme.

## 👓 批判一番和贡献代码

[Issue](https://github.com/dsrkafuu/hugo-theme-fuji/issues)。主题本身只在 Firefox 上完整测试过，因此要是遇到了什么问题也可以随便批判。

## 📝 License

The theme is released under the `Apache License 2.0`, for more information read the [License](https://github.com/dsrkafuu/hugo-theme-fuji/blob/master/LICENSE).

- [Primer CSS - MIT](https://github.com/primer/css/blob/master/LICENSE)
- [APlayer - MIT](https://github.com/MoePlayer/APlayer/blob/master/LICENSE)
- [lazysizes - MIT](https://github.com/aFarkas/lazysizes/blob/gh-pages/LICENSE)
- [DisqusJS - MIT](https://github.com/SukkaW/DisqusJS/blob/master/LICENSE)
- [ionicons - MIT](https://github.com/ionic-team/ionicons/blob/master/LICENSE)
- [Fuse.js - Apache-2.0](https://github.com/krisk/Fuse/blob/master/LICENSE)
- [cloudflare-workers-async-google-analytics - MIT](https://github.com/SukkaW/cloudflare-workers-async-google-analytics/blob/master/LICENSE)
- [art-template - MIT](https://github.com/aui/art-template/blob/master/LICENSE)

**Copyright © 2019-present DSRKafuU <https://dsrkafuu.su/>**

## 🤝 Annotations

Thanks to [community contributors](https://github.com/dsrkafuu/hugo-theme-fuji/graphs/contributors) for great help.

Learned a lot in [Sukka's Blog](https://blog.skk.moe/).
