# 🍥 Fuji 🍥

Fuji is a minimal Hugo theme with full dark mode support and GitHub Primer markdown style.

![GitHub release](https://img.shields.io/github/v/release/dsrkafuu/hugo-theme-fuji)
![GitHub build status](https://img.shields.io/github/workflow/status/dsrkafuu/hugo-theme-fuji/build-test)
![GitHub license](https://img.shields.io/github/license/dsrkafuu/hugo-theme-fuji)

[English](https://github.com/dsrkafuu/hugo-theme-fuji#readme) | [简体中文](https://github.com/dsrkafuu/hugo-theme-fuji/blob/master/README_CN.md)

> Checkout the brand new [VSCode Aofuji Light Theme](https://github.com/dsrkafuu/vscode-theme-aofuji) which has similar color scheme to [Aofuji](https://github.com/dsrkafuu/hugo-template-aofuji)!

Supported languages: `cs`, `de`, `en`, `eo`, `fr`, `ja`, `nl`, `pl`, `pt-pt`, `zh-hans`, `zh-hant`. Check the i18n folder to add more languages.

## 📑 Table of contents

- [💻 Live demos](#-live-demos)
- [❗ Notice](#-notice)
- [🐣 Getting started](#-getting-started)
- [🆕 Update the theme](#-update-the-theme)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
  - [🎨 Favicon](#-favicon)
  - [❌ License, toc and comments](#-license-toc-and-comments)
  - [🎵 APlayer](#-aplayer)
  - [📐 Render LaTeX with KaTex](#-render-latex-with-katex)
  - [📷 Image zoom and lazyload settings](#-image-zoom-and-lazyload-settings)
  - [⚓ Markdown render hook](#-markdown-render-hook)
  - [📨 Comments area](#-comments-area)
  - [🔧 Custom stylesheet configuration](#-custom-stylesheet-configuration)
- [✏️ Issue and contributing](#%EF%B8%8F-issue-and-contributing)
- [📝 License](#-license)
- [🤝 Annotations](#-annotations)

## 💻 Live demos

[**Live Demo (GitHub Pages)**](https://github.dsrkafuu.net/hugo-theme-fuji/)

![Screenshot of Fuji](https://raw.githubusercontent.com/dsrkafuu/hugo-theme-fuji/master/images/screenshot.png)

## ❗ Notice

Remember to add [summary divider](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->` to your post `.md` files to show blockquotes, links and codes with proper style in list pages' summary part.

## 🐣 Getting started

Inside the folder of your Hugo site run:

```bash
git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

Then copy the `config.toml` in the `exampleSite` to the root of your Hugo site, and use it as a reference for your config file. **It contains all of the settings for site menus, search pages and other features, you'll need this file to make your site work properly.**

## 🆕 Update the theme

You can watch (release only) this repo to receive update notifications.

Inside the folder of your Hugo site run:

```bash
git submodule update --remote --merge
```

## ⚙️ Configuration

### 🎨 Favicon

Create `[SITEROOT]/layouts/partials/favicon.html` to cover theme's favicon.

You can generate your favicons in [realfavicongenerator.net](https://realfavicongenerator.net/).

### ❌ License, toc and comments

Globally in `config.toml`:

```toml
showLicense = true # Enable or disable license for all post
showToc = true # Enable or disable ToC for all post
```

Or in posts' front matter:

```toml
showLicense = true # Enable or disable license for this specific post
showToc = true # Enable or disable ToC for this specific post
```

To disable comment area for specific post, add this in front matter:

```toml
showComments = false # Do not show comments in this post
```

### 🎵 APlayer

In-post APlayer supported, you use the `aplayer` shortcode:

```txt
{{< aplayer urls="/aplayer/fluid.mp3" names="Fluid" artists="Crowander" covers="/aplayer/crowander.jpg" >}}
```

Checkout the `exampleSite/content/post/aplayer-test.md` for more example usage such as using multiple files.

### 📐 Render LaTeX with KaTex

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

### 📷 Image zoom and lazyload settings

Zoomable, not lazyloaded:

```markdown
![Alt text](test/example.png)
```

Zoomable, lazyloaded:

<!-- prettier-ignore -->
```html
{{< img-lazy "16x9" "Alt text here" "test/example.png" >}}
```

Not zoomable, not lazyloaded, optional ext link:

<!-- prettier-ignore -->
```html
{{< img-nz "Alt text here" "test/example.png" >}}
```

Not zoomable, lazyloaded, optional ext link:

<!-- prettier-ignore -->
```html
{{< img-nz-lazy "16x9" "Alt text here" "test/example.png" >}}
```

Available image aspect ratios:

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

### ⚓ Markdown render hook

You can create the files below in your site to adjust the markdown render hook, see [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks).

You can use `[SITEROOT]/layouts/_default/_markup/render-link.html` to decide whether or not links in the markdown content will open in new tab:

<!-- prettier-ignore -->
```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### 📨 Comments area

Theme supports Disqus, utterances and DisqusJS (for Mainland China user)。

by default, disqus uses `{{ .Permalink }}` as `url`, `{{ .File.ContentBaseName }}` as `identifier`.

Use the `[SITEROOT]/layouts/partials/comment-*.html` to cover `themes/fuji/layouts/partials/comment-*.html`. Then you can customize the url and identifier, or set multiple api key, add more settings for using DisqusJS. If you want to use DisqusJS, please remember to set `disqusJSApi` to anything in your `config.toml` to load CSS.

### 🔧 Custom stylesheet configuration

> Hugo extended version needed.

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

## ✏️ Issue and contributing

Feel free to use the [issue tracker](https://github.com/dsrkafuu/hugo-theme-fuji/issues). The theme has only been fully tested on Firefox, so if there are some problems when accessing with Chrome or others please also report an issue.

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
