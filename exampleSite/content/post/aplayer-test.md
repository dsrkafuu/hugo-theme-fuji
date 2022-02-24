+++
title = "In-post APlayer Test"
date = 2021-01-10T00:00:00+08:00
description = "In-post APlayer testpage of Hugo theme Fuji"
tags = ["test", "aplayer"]
aplayer = true
showLicense = false
+++

{{< aplayer urls="/aplayer/berlin.mp3" names="Berlin" artists="Crowander" covers="/aplayer/crowander.jpg" >}}

This post is for in-post APlayer test, above is previous post-player.

Music files are all downloaded from [Free Music Archive](https://freemusicarchive.org).

<!--more-->

## Single file

{{< aplayer urls="/aplayer/fluid.mp3" names="Fluid" artists="Crowander" covers="/aplayer/crowander.jpg" >}}

## Multiple files

You can open the playlist to check other musics.

{{<
  aplayer
  urls="/aplayer/berlin.mp3, /aplayer/fluid.mp3, /aplayer/morning.mp3"
  names="Berlin, Fluid, Morning"
  artists="Crowander, Crowander, Crowander"
  covers="/aplayer/crowander.jpg, /aplayer/crowander.jpg, /aplayer/crowander.jpg"
>}}

Spaces between multiple items can be omited.
