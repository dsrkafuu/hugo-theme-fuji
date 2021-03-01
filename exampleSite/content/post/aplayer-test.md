+++
title = "In-post APlayer Test"
date = 2021-01-10T00:00:00+08:00
description = "In-post APlayer testpage of Hugo theme Fuji"
tags = ["test", "aplayer"]
aplayer = true
showLicense = false
+++

{{< aplayer urls="/theme/hugo-theme-fuji/aplayer/berlin.mp3" names="Berlin" artists="Crowander" covers="/theme/hugo-theme-fuji/aplayer/crowander.jpg" >}}

This post is for in-post APlayer test, above is previous post-player.

Music files are all downloaded from [Free Music Archive](https://freemusicarchive.org).

<!--more-->

## Single file

{{< aplayer urls="/theme/hugo-theme-fuji/aplayer/fluid.mp3" names="Fluid" artists="Crowander" covers="/theme/hugo-theme-fuji/aplayer/crowander.jpg" >}}

## Multiple files

You can open the playlist to check other musics.

{{< aplayer
    urls="/theme/hugo-theme-fuji/aplayer/berlin.mp3, /theme/hugo-theme-fuji/aplayer/fluid.mp3, /theme/hugo-theme-fuji/aplayer/morning.mp3"
    names="Berlin, Fluid, Morning"
    artists="Crowander, Crowander, Crowander"
    covers="/theme/hugo-theme-fuji/aplayer/crowander.jpg, /theme/hugo-theme-fuji/aplayer/crowander.jpg, /theme/hugo-theme-fuji/aplayer/crowander.jpg"
>}}

Spaces between multiple items can be omited.
