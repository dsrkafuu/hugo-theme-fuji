# Fuji

![RELEASE](https://img.shields.io/github/v/release/amzrk2/hugo-theme-fuji) ![BUILD STATUS](https://img.shields.io/github/workflow/status/amzrk2/hugo-theme-fuji/Build%20Test) ![REPO SIZE](https://img.shields.io/github/repo-size/amzrk2/hugo-theme-fuji) ![LICENSE](https://img.shields.io/github/license/amzrk2/hugo-theme-fuji)

A minimal Hugo theme inspired by Hexo theme [Murasaki](https://github.com/printempw/hexo-theme-murasaki/), with responsive grid system and markdown style, powered by GitHub Primer CSS.

## Live demos

[**Demo on gohugo.io (en)**](https://themes.gohugo.io/theme/hugo-theme-fuji/) | [My Blog (zh-Hans)](https://blog.amzrk2.cc/)

![Screenshot of the theme](https://raw.githubusercontent.com/amzrk2/hugo-theme-fuji/master/images/screenshot.png)

## Todo

- [x] Custom pagination
- [x] Archive page
- [x] Analytics
- [x] SEO optimization
- [x] Better mobile devices support
- [ ] Multilingual

## Installation

Inside the folder of your Hugo site run:

```bash
$ git submodule add https://github.com/amzrk2/hugo-theme-fuji.git themes/fuji
```

For more information read the official [setup guide](https://gohugo.io/overview/installing/) of Hugo.

## Notice

Remember to add ```<!--more-->``` code to your post ```.md``` files to show blockquotes, links and codes with proper style in list pages' summary part.

## Getting started

Copy the ```config.toml``` in the ```exampleSite```to the root of your Hugo site. Change strings as you like.

Run Hugo's built-in local server:

```bash
$ hugo server
```

If you want to generate your site, just run ```hugo``` or ```hugo --minify```.

## Advance configration

### In-post license & comments

You can set variables below in post's front matter to disable them:

```toml
noLicense = true # Do not show license in this post
noComments = true # Do not show comments in this post
```

### APlayer

APlayer support both global left-bottom-fixed or in-post, you can set these variables in site's ```config.toml``` or in post's front matter:

```toml
playerName = "..." # Audio title or name
playerArtist = "..." # Audio artist
playerURL = "..." # Audio URL, support aac, mp3, wav and ogg
playerCover = "..." # Audio cover
```

### Lazyload images

Lazyload images in posts, for example in ```[SITEROOT]/content/post/test.md```:

```go-html-template
{{< lazyimg "This is alt text" "/img/sample.png" >}}
{{< lazyimg-row "This is alt text" "/img/sample.png" >}}
{{< lazyimg-col "This is alt text" "/img/sample.png" >}}
```

```lazyimg``` will show a 16x9 placeholder before image is loaded, so ```lazyimg-row``` will show a 32x9 placeholder and ```lazyimg-col``` will show a 8x9 placeholder. You can choose different aspect ratios you want for different images. The placeholder image can be set in site's ```config.toml```.

Note that if you use the origin markdown syntax to add images such as ```![This is alt text](/img/sample.png)```, it will not become a lazy image.

### Custom CSS (need extended version of Hugo)

You can create ```[SITEROOT]/assets/sass/custom.sass``` to cover sass variables of the theme. Just copy the variable which you need into it, check available variables below:

```sass
// colors
$color-primary: #8AA2D3; // apply to titles and icons
$color-primary-dark: #3B469B; // apply to links:hover and pagination:current
$color-secondary: #8F82BC; // apply to titles:hover, normal links, tags, pagination and sidebars
$color-mute: #9EA1A3; // apply to sub-title and post metadata
$color-spliter: #E5E2E4; // apply to divider and button background
$color-bg: #FFFFFD !default; // https://irocore.com/shiro/

// font size list
$font-size-logo: 2.5rem; // Logo Only
$font-size-l1: 1.75rem; // Primer CSS H1
$font-size-l2: 1.5rem; // Primer CSS H2
$font-size-l3: 1.25rem; // Primer CSS H3
$font-size-l4: 1rem; // Primer CSS H4 & Normal Text

// divider css
$spliter: 2px solid $color-spliter;

// fixed-width container variables
$container-width: 900px;
// large screen / desktop (900 + (16 * 2)) <= container + gutters
$width-lg: 932px;

// font stacks
$body-font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
// monospace font stack
$mono-font: "Cascadia Code", "SF Mono", "Fira Code", "Consolas", $body-font;
// the base text size
$body-font-size: $font-size-l4;
```

### Markdown render hook

You can create the files below in your site to adjust the markdown render hook, see [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks).

You can use ```[SITEROOT]/layouts/_default/_markup/render-link.html``` to decide whether or not links in the markdown content will open in new tab:

```html
<a href="{{ .Destination | safeURL }}"{{ with .Title }} title="{{ . }}"{{ end }}{{ if strings.HasPrefix .Destination "http" }} target="_blank"{{ end }}>{{ .Text | safeHTML }}</a>
```

## Update the theme

Inside the folder of your Hugo site run:

```bash
$ git submodule update --remote --merge
```

## Contributing

Did you found a bug or got an idea for a new feature? Feel free to use the [issue tracker](https://github.com/amzrk2/hugo-theme-fuji/issues) to let me know.

## License

The theme is released under the ```GNU General Public License v3.0```, for more information read the [License](https://github.com/amzrk2/hugo-theme-fuji/blob/master/LICENSE).

## Annotations

Thanks to [community contributors](https://github.com/amzrk2/hugo-theme-fuji/graphs/contributors) for great help.

Thanks to developers for creating Hugo, Primer CSS, Font Awesome, APlayer and Lazysizes with the awesome community around these project.
