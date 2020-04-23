# Fuji

A minimal Hugo theme inspired by Hexo theme [Murasaki](https://github.com/printempw/hexo-theme-murasaki/), with responsive grid system and markdown style, powered by GitHub Primer CSS.

## Live demos

[GitHub Pages Demo](https://amzrk2.cc/hugo-theme-fuji-demo/) | [My Blog](https://blog.amzrk2.cc/)

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

## Getting started

Copy the ```config.toml``` in the ```exampleSite```to the root of your Hugo site. Change strings as you like.

Run Hugo's built-in local server:

```bash
$ hugo server
```

If you want to generate your site, just run ```hugo``` or ```hugo --minify```.

## Advance configration

### In-post license

You can set variables below in post's front matter to disable it:

```toml
noLicense = true # Do not show license in this post
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

Lazyload images in posts, for example in ```content/post/test.md```:

```go-html-template
{{< lazyimg "This is alt text" "/img/sample.png" >}}
{{< lazyimg-row "This is alt text" "/img/sample.png" >}}
{{< lazyimg-col "This is alt text" "/img/sample.png" >}}
```

```lazyimg``` will show a 16x9 placeholder before image is loaded, so ```lazyimg-row``` will show a 32x9 placeholder and ```lazyimg-col``` will show a 8x9 placeholder. You can choose different aspect ratios you want for different images. The placeholder image can be set in site's ```config.toml```.

Note that if you use the origin markdown syntax to add images such as ```![This is alt text](/img/sample.png)```, it will not become a lazy image.

### Markdown render hook

You can create the files below in your site to adjust the markdown render hook, see [Hugo's Official Docs](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks).

You can use ```layouts/_default/_markup/render-link.html``` to decide whether or not links in the markdown content will open in new tab:

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

Thanks to [ress](https://github.com/ress997/) for some great help and [printempw](https://github.com/printempw/) for the origin idea of theme.

Thanks to developers for creating Hugo, Primer CSS, Font Awesome, APlayer and Lazysizes with the awesome community around these project.
