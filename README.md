# Fuji

Fuji is a minimal Hugo theme with full dark mode support and GitHub Primer markdown style.

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![CODE SIZE](https://img.shields.io/github/languages/code-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [白话文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

## Table of contents

- [Live demos](#live-demos)
- [Notice](#notice)
- [Getting started](#getting-started)
- [Update the theme](#update-the-theme)
- [Configration](#configration)
  - [Favicon](#favicon)
  - [In-post license & comments](#in-post-license--comments)
  - [APlayer](#aplayer)
  - [Image zoom and lazyload settings](#image-zoom-and-lazyload-settings)
  - [Markdown render hook](#markdown-render-hook)
  - [Custom fonts](#custom-fonts)
  - [Disqus identifier](#disqus-identifier)
- [Contributing](#contributing)
- [License](#license)
- [Annotations](#annotations)

## Live demos

[**Demo on gohugo.io (en)**](https://themes.gohugo.io/theme/hugo-theme-fuji/) | [My Blog (zh-Hans)](https://blog.amzrk2.cc/)

<!--more-->

![Screenshot of Fuji](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## Notice

Remember to add [summary divider](https://gohugo.io/content-management/summaries/#manual-summary-splitting) `<!--more-->` to your post `.md` files to show blockquotes, links and codes with proper style in list pages' summary part.

## Getting started

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

## Update the theme

Inside the folder of your Hugo site run:

```bash
$ git submodule update --remote --merge
```

## Configration

### Favicon

Create `[SITEROOT]/layouts/partials/favicon.html` to cover theme's favicon.

You can generate your favicons in [realfavicongenerator.net](https://realfavicongenerator.net/).

### In-post license & comments

You can set variables below in post's front matter to disable them:

```toml
noLicense = true # Do not show license in this post
noComments = true # Do not show comments in this post
```

### APlayer

In-post APlayer supported, you can set these variables in post's front matter:

```toml
playerName = "..." # Audio title or name
playerArtist = "..." # Audio artist
playerURL = "..." # Audio URL, support aac, mp3, wav and ogg
playerCover = "..." # Audio cover
```

### Image zoom and lazyload settings

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

### Markdown render hook

You can create the files below in your site to adjust the markdown render hook, see [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks).

You can use `[SITEROOT]/layouts/_default/_markup/render-link.html` to decide whether or not links in the markdown content will open in new tab:

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

### Custom fonts

**Hugo Extended version needed.**

You can create `[SITEROOT]/assets/_custom.sass` to cover sass variables of the theme. Just copy the variable which you need into it, check available variables below:

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

### Custom highlight.js language support

Set `customHighlight` to `true` in `config.toml`, then set `customHighlightURL` to the path of your own `highlight.js`.

Check [Getting highlight.js](https://highlightjs.org/download/) to download you own bundle of highlight.js.

### Disqus identifier

Use the `[SITEROOT]/layouts/partials/comment-disqus.html` to cover `themes/fuji/layouts/partials/comment-disqus.html`.

## Contributing

Note that to keep the `master` branch clean, the main development work is made under `dev` branch. Please set base branch to `dev`, then make commitment or pull request.

Feel free to use the [issue tracker](https://github.com/amzrk2/hugo-theme-fuji/issues). The theme has only been fully tested on Firefox, so if there are some problems when accessing with Chrome or others please also report an issue.

## License

The theme is released under the ```Apache License 2.0```, for more information read the [License](https://github.com/amzrk2/hugo-theme-fuji/blob/master/LICENSE).

- [Font Awesome - Creative Commons Attribution 4.0 International](https://fontawesome.com/license)

> © 2020 DSRKafuU(amzrk2) Twitter[@amzrk2](https://twitter.com/amzrk2)

## Annotations

Thanks to [community contributors](https://github.com/amzrk2/hugo-theme-fuji/graphs/contributors) for great help.

- [Hugo](https://gohugo.io/)
- [Primer CSS](https://primer.style/css/)
- [APlayer](https://github.com/MoePlayer/APlayer)
- [lazysizes](https://github.com/aFarkas/lazysizes)
- [medium-zoom](https://github.com/francoischalifour/medium-zoom)
