# 🍥 Fuji 🍥

Fuji is a minimal Hugo theme with full dark mode support and GitHub Primer markdown style.

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![CODE SIZE](https://img.shields.io/github/languages/code-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [简体中文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

After the release of v2, **there may be major changes in the image lazyload shortcode** to make it easier to use. If you want to change the color scheme, please check [🔧 Advanced configuration](#-advanced-configuration).

Now supported i18n langs: en, zh-hans, zh-hant, ja, nl. Check the i18n folder to add more languages.

## 📑 Table of contents

- [💻 Live demos](#-live-demos)
- [❗ Notice](#-notice)
- [🐣 Getting started](#-getting-started)
- [🆕 Update the theme](#-update-the-theme)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
  - [🎨 Favicon](#-favicon)
  - [❌ License, toc und comments](#-license-toc-und-comments)
  - [🎵 APlayer](#-aplayer)
  - [📷 Image zoom and lazyload settings](#-image-zoom-and-lazyload-settings)
  - [⚓ Markdown render hook](#-markdown-render-hook)
  - [📨 Comments area](#-comments-area)
  - [🔧 Advanced configuration](#-advanced-configuration)
- [✏️ Issue und contributing](#%EF%B8%8F-issue-und-contributing)
- [📝 License](#-license)
- [🤝 Annotations](#-annotations)

## 💻 Live demos

[**Live Demo (en)**](https://hugo-theme-fuji-demo.now.sh/) | [My Blog (zh-Hans)](https://blog.amzrk2.cc/)

![Screenshot of Fuji](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## ❗ Notice

Remember to add [summary divider](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->` to your post `.md` files to show blockquotes, links and codes with proper style in list pages' summary part.

## 🐣 Getting started

Inside the folder of your Hugo site run:

```bash
$ git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

Then copy the `config.toml` in the `exampleSite`to the root of your Hugo site. Change strings as you like.

Run Hugo's built-in local server:

```bash
$ hugo server
```

If you want to generate your site, just run `hugo` or `hugo --minify`.

## 🆕 Update the theme

You can watch (release only) this repo to receive update notifications.

Inside the folder of your Hugo site run:

```bash
$ git submodule update --remote --merge
```

## ⚙️ Configuration

### 🎨 Favicon

Create `[SITEROOT]/layouts/partials/favicon.html` to cover theme's favicon.

You can generate your favicons in [realfavicongenerator.net](https://realfavicongenerator.net/).

### ❌ License, toc und comments

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

In-post APlayer supported, you can set these variables in post's front matter:

```toml
[[player]]
  playerName = "..." # Audio title or name
  playerArtist = "..." # Audio artist
  playerURL = "..." # Audio URL, support aac, mp3, wav and ogg
  playerCover = "..." # Audio cover
[[player]]
  playerName = "..."
  playerArtist = "..."
  playerURL = "..."
  playerCover = "..."
```

### 📷 Image zoom and lazyload settings

Zoomable, not lazyloaded:

```markdown
![Alt text](test/example.png)
```

Zoomable, lazyloaded:

```html
{{< img-lazy "Alt text" "test/example.png" >}}
{{< img-lazy "row" "Alt text" "test/example.png" >}}
{{< img-lazy "col" "Alt text" "test/example.png" >}}
```

Not zoomable, not lazyloaded, optional ext link:

```html
{{< img-nz "Alt text" "test/example.png" ["https://example.com"] >}}
```

Not zoomable, lazyloaded, optional ext link:

```html
{{< img-nz-lazy "Alt text" "test/example.png" ["https://example.com"] >}}
{{< img-nz-lazy "row" "Alt text" "test/example.png" ["https://example.com"] >}}
{{< img-nz-lazy "col" "Alt text" "test/example.png" ["https://example.com"] >}}
```

`img-lazy` will show a 16x9 placeholder before image is loaded, so `img-lazy-row` will show a 32x9 placeholder and `img-lazy-col` will show a 8x9 placeholder. You can choose different aspect ratios you want for different images. The placeholder image can be set in site's `config.toml`.

### ⚓ Markdown render hook

You can create the files below in your site to adjust the markdown render hook, see [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks).

You can use `[SITEROOT]/layouts/_default/_markup/render-link.html` to decide whether or not links in the markdown content will open in new tab:

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### 📨 Comments area

Theme supports Disqus, utterances and DisqusJS (for Mainland China user)。

by default, disqus uses `{{ .Permalink }}` as `url`, `{{ .File.ContentBaseName }}` as `identifier`.

Use the `[SITEROOT]/layouts/partials/comment-*.html` to cover `themes/fuji/layouts/partials/comment-*.html`. Then you can customize the url and identifier, or set multiple api key, add more settings for using DisqusJS. If you want to use DisqusJS, please remember to set `disqusJSApi` to anything in your `config.toml` to load CSS.

### 🔧 Advanced configuration

See [Report und contributing](#report-und-contributing).

If you just simply want to change the color scheme, set this in your `config.toml`:

```toml
useHugoPipes = true
```

This will make the theme use Hugo Pipes provided by Hugo Extended Vesion to compile the SCSS, then you can cover theme's internal SCSS with your own. Then create `[SITEROOT]/assets/scss/_custom.scss` cover variables in SCSS:

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

## ✏️ Issue und contributing

Note that to keep the `master` branch clean, the main development work is made under `dev` branch. Please set base branch to `dev`, then make commitment or pull request.

Feel free to use the [issue tracker](https://github.com/amzrk2/hugo-theme-fuji/issues). The theme has only been fully tested on Firefox, so if there are some problems when accessing with Chrome or others please also report an issue.

Inside the folder of theme root run:

```bash
npm install
```

Dev:

```bash
npm run dev
```

Build:

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
