# Fuji

简单的 Hugo 主题，支持夜间模式，Markdown 样式来自 GitHub Primer。

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![CODE SIZE](https://img.shields.io/github/languages/code-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [简体中文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

## 目录

- [在线 Demo](#在线-demo)
- [注意事项](#注意事项)
- [开始使用](#开始使用)
- [更新主题](#更新主题)
- [自定义设置](#自定义设置)
  - [站点图标](#站点图标)
  - [关闭特定文章的 License 和评论](#关闭特定文章的-license-和评论)
  - [文章音乐](#文章音乐)
  - [图片放大的设置和 lazyload](#图片放大的设置和-lazyload)
  - [Markdown 钩子](#markdown-钩子)
  - [这字体也太丑了，换掉](#这字体也太丑了换掉)
  - [Disqus](#disqus)
  - [通过 CDN 加载主 CSS 和 JS](#通过-cdn-加载主-css-和-js)
  - [其他高级修改](#其他高级修改)
- [批判一番和贡献代码](#批判一番和贡献代码)
- [License](#license)
- [Annotations](#annotations)

## 在线 Demo

[**在线 Demo (英文)**](https://themes.gohugo.io/theme/hugo-theme-fuji/) | [我的博客 (中文)](https://blog.amzrk2.cc/)

![Fuji 截图](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## 注意事项

记得给文章添加 [简介分隔线](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->`，以让文章列表的文章预览部分样式正确。

## 开始使用

添加主题：

```bash
$ git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

其他的可以看[官方指南](https://gohugo.io/overview/installing/)。

然后把 `exampleSite` 复制出来，并修改 `config.toml` 即可。

## 更新主题

```bash
$ git submodule update --remote --merge
```

## 自定义设置

### 站点图标

使用 `[SITEROOT]/layouts/partials/favicon.html` 来覆盖主题自带的图标。

可以在 [realfavicongenerator.net](https://realfavicongenerator.net/) 快速创建自己的图标。

### 关闭特定文章的 License 和评论

安全第一，在 front matter 里加上这些:

```toml
noLicense = true # 憋显示 License
noComments = true # 憋显示评论区
```

### 文章音乐

支持给文章单独添加 APlayer，在 front matter 里加上这些:

```toml
playerName = "..." # 标题
playerArtist = "..." # 作者
playerURL = "..." # URL
playerCover = "..." # 封面
```

### 图片放大的设置和 lazyload

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

### Disqus

默认情况下主题使用以下设置：

```js
this.page.url = {{ $.Permalink }};
this.page.identifier = {{ $.File.ContentBaseName }};
```

使用 `[SITEROOT]/layouts/partials/comment-disqus.html` 来覆盖 `themes/fuji/layouts/partials/comment-disqus.html`。可在此文件内自定义指定的 url 和 identifier，同时也可以切换成 DisqusJS，具体实现可以参考这里。注意如果使用 DisqusJS，将 `config.toml` 内的 `useDisqusJS = true` 解除注释来加载 CSS。

### 通过 CDN 加载主 CSS 和 JS

如果你不需要自行修改 CSS 和 JS，可以将 `config.toml` 内的 `mainAssetsCDN = true` 解除注释。`fuji.min.css` 和 `fuji.min.js` 将会从 jsDelivr 加载。

### 其他高级修改

见[批判一番和贡献代码](#批判一番和贡献代码)。

## 批判一番和贡献代码

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

## License

The theme is released under the ```Apache License 2.0```, for more information read the [License](https://github.com/amzrk2/hugo-theme-fuji/blob/master/LICENSE).

- [Primer CSS - MIT](https://github.com/primer/css/blob/master/LICENSE)
- [APlayer - MIT](https://github.com/MoePlayer/APlayer/blob/master/LICENSE)
- [lazysizes - MIT](https://github.com/aFarkas/lazysizes/blob/gh-pages/LICENSE)
- [medium-zoom - MIT](https://github.com/francoischalifour/medium-zoom/blob/master/LICENSE)
- [DisqusJS - MIT](https://github.com/SukkaW/DisqusJS/blob/master/LICENSE)
- [Font Awesome - CC 4.0](https://fontawesome.com/license)

> © 2020 DSRKafuU(amzrk2) [Twitter](https://twitter.com/amzrk2) [GitHub]()

## Annotations

Thanks to [community contributors](https://github.com/amzrk2/hugo-theme-fuji/graphs/contributors) for great help.

Learned a lot in [Sukka's Blog](https://blog.skk.moe/).
