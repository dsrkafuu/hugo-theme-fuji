# Fuji

简单的 Hugo 主题，支持夜间模式，Markdown 照搬 GitHub Primer。萌新一个啥也不会，有问题尽管提（

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![REPO SIZE](https://img.shields.io/github/repo-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [白话文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

## 目录

- [在线 Demo](#在线-demo)
- [注意注意注意啦](#注意注意注意啦)
- [所以怎么用](#所以怎么用)
- [更新主题](#更新主题)
- [看看设置项](#看看设置项)
  - [改下网站图标](#改下网站图标)
  - [这文章有点敏感，关了 License 和评论吧](#这文章有点敏感关了-license-和评论吧)
  - [加点音乐](#加点音乐)
  - [放大图片；网慢，要 lazyload](#放大图片网慢要-lazyload)
  - [Markdown 钩子](#markdown-钩子)
  - [这字体也太丑了，换掉](#这字体也太丑了换掉)
  - [自定义 highlight.js 支持的语言]()
  - [Disqus identifier](#disqus-identifier)
- [批判一番](#批判一番)
- [License](#license)
- [Annotations](#annotations)

## 在线 Demo

[**Demo on gohugo.io (英文)**](https://themes.gohugo.io/theme/hugo-theme-fuji/) | [My Blog (中文)](https://blog.amzrk2.cc/)

<!--more-->

![Screenshot of Fuji](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## 注意注意注意啦

记得加上 [简介分隔线](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->` 到文章里面，不然 Hugo 会直接自己裁剪简介，列表显示不出样式。

## 所以怎么用

```bash
$ git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

其他的可以看[官方指南](https://gohugo.io/overview/installing/)。

然后把 `exampleSite` 复制出来，改下 `config.toml` 就行了。

## 更新主题

```bash
$ git submodule update --remote --merge
```

## 看看设置项

### 改下网站图标

用 `[SITEROOT]/layouts/partials/favicon.html` 来覆盖主题自带的图标。

可以在 [realfavicongenerator.net](https://realfavicongenerator.net/) 快速创建自己的图标。

### 这文章有点敏感，关了 License 和评论吧

安全第一，在 front matter 里加上这些:

```toml
noLicense = true # 憋显示 License
noComments = true # 憋显示评论区
```

### 加点音乐

支持给文章单独添加 APlayer，在 front matter 里加上这些:

```toml
playerName = "..." # 标题
playerArtist = "..." # 作者
playerURL = "..." # URL
playerCover = "..." # 封面
```

### 放大图片；网慢，要 lazyload

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

### Markdown 钩子

具体内容看 [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks)，用于配置 Markdown 解释器。

比如你可以用 `[SITEROOT]/layouts/_default/_markup/render-link.html` 来修改文章里的链接是否在新页面打开：

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### 这字体也太丑了，换掉

**要 Hugo Extended 版的**

创建 `[SITEROOT]/assets/_custom.sass` 来覆盖主题的 sass 变量，以下是可以用的：

```scss
$font-size-0: 2rem; // 16px->32px
$font-size-1: 1.75rem; // 16px->28px #
$font-size-2: 1.5rem; // 16px->24px ##
$font-size-3: 1.25rem; // 16px->20px ###
$font-size-4: 1rem; // 16px->16px ####

$body-font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', 'Helvetica', 'Arial', 'PingFang SC',
    'Hiragino Sans GB', 'Source Han Sans CN', 'Source Han Sans SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
$mono-font: 'Cascadia Code', 'SF Mono', 'Fira Code', 'Consolas', $body-font;
$body-font-size: 16px;
```

### 自定义 highlight.js 支持的语言

在 `config.toml` 里面把 `customHighlight` 设置为 `true`，将 `customHighlightURL` 设置为自定义的 `highlight.js` 的路径即可。

语言的选择可以去 [Getting highlight.js](https://highlightjs.org/download/)，非自定义情况下默认使用的即默认选项。

### Disqus identifier

用 `[SITEROOT]/layouts/partials/comment-disqus.html` 覆盖 `themes/fuji/layouts/partials/comment-disqus.html`.

## 批判一番

为了保证 `master` 分支干净，所有开发都是在 `dev` 分支进行的，记得对着 `dev` 分支批判。

[Issue](https://github.com/amzrk2/hugo-theme-fuji/issues)。主题本身只在 Firefox 上完整测试过，因此要是遇到了什么问题也可以随便批判。

## License

The theme is released under the ```Apache License 2.0```, for more information read the [License](https://github.com/amzrk2/hugo-theme-fuji/blob/master/LICENSE).

> © 2020 DSRKafuU(amzrk2) Twitter[@amzrk2](https://twitter.com/amzrk2)

## Annotations

Thanks to [community contributors](https://github.com/amzrk2/hugo-theme-fuji/graphs/contributors) for great help.

- [Hugo](https://gohugo.io/)
- [Primer CSS](https://primer.style/css/)
- [APlayer](https://github.com/MoePlayer/APlayer)
- [lazysizes](https://github.com/aFarkas/lazysizes)
- [medium-zoom](https://github.com/francoischalifour/medium-zoom)
