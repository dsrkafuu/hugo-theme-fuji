# Fuji

Fuji is a minimal Hugo theme with full dark mode support and GitHub Primer markdown style.

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji?style=flat-square) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test?style=flat-square) ![CODE SIZE](https://img.shields.io/github/languages/code-size/amzrk2/hugo-theme-fuji?style=flat-square) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji?style=flat-square)

[English](https://github.com/amzrk2/hugo-theme-fuji#readme) | [简体中文](https://github.com/amzrk2/hugo-theme-fuji/blob/master/README_CN.md)

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
  - [Comments area](#comments-area)
  - [Load main CSS und JS from CDN](#load-main-css-und-js-from-cdn)
  - [Advanced configuration](#advanced-configuration)
- [Report und contributing](#report-und-contributing)
- [License](#license)
- [Annotations](#annotations)

## Live demos

[**Live Demo (en)**](https://themes.gohugo.io/theme/hugo-theme-fuji/) | [My Blog (zh-Hans)](https://blog.amzrk2.cc/)

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

### Comments area

主题支持三种评论系统，Disqus、utterances 和 DisqusJS (给大陆用户的)。

对于 Disqus 默认情况下使用 `{{ .Permalink }}` 作为 `url`，使用 `{{ .File.ContentBaseName }}` 作为 `identifier`。

Use the `[SITEROOT]/layouts/partials/comment-*.html` to cover `themes/fuji/layouts/partials/comment-*.html`. Then you can customize the url and identifier, or set multiple api key for using DisqusJS. If you want to use DisqusJS, please remember to set `disqusJSApi` to anything in your `config.toml` to load CSS.

You can check my blog for example of using DisqusJS, remember to set to your own key when deploing:

- [`config.toml`]()
- [`comment-disqusjs.html`]()

### Load main CSS und JS from CDN

Without the demand of custmize the CSS, you can uncomment `mainAssetsCDN = true` in `config.toml` to load `fuji.min.css` and `fuji.min.js` from jsDelivr.

### Advanced configuration

See [Report und contributing](#report-und-contributing).

## Report und contributing

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
