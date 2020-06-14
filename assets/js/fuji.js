'use strict';

// get current theme
function getNowTheme() {
    let nowTheme = document.body.getAttribute('data-theme');
    if (nowTheme === 'auto') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
        return nowTheme === 'dark' ? 'dark' : 'light';
    }
}

// update utterances theme
function updateUtterancesTheme(utterancesFrame) {
    let targetTheme = getNowTheme();
    if (utterancesFrame) {
        if (targetTheme === 'dark') {
            utterancesFrame.contentWindow.postMessage(
                {
                    type: 'set-theme',
                    theme: 'photon-dark',
                },
                'https://utteranc.es'
            );
        } else {
            utterancesFrame.contentWindow.postMessage(
                {
                    type: 'set-theme',
                    theme: 'github-light',
                },
                'https://utteranc.es'
            );
        }
    }
}

// load comment button only when comment area exist
if (document.querySelector('span.post-comment-notloaded')) {
    document.querySelector('span.post-comment-notloaded').addEventListener('click', loadComment);
}

// to-top button
document.querySelector('.btn .btn-scroll-top').addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});

// theme switch button
document.querySelector('.btn .btn-toggle-mode').addEventListener('click', () => {
    let nowTheme = getNowTheme();
    let domTheme = document.body.getAttribute('data-theme');
    let systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (domTheme === 'auto') {
        // if now in auto mode, switch to user mode
        document.body.setAttribute('data-theme', nowTheme === 'light' ? 'dark' : 'light');
        localStorage.setItem('fuji_data-theme', nowTheme === 'light' ? 'dark' : 'light');
    } else if (domTheme === 'light') {
        // if now in user mode and light mode
        document.body.setAttribute('data-theme', 'dark');
        // if the theme want to switch is system theme
        localStorage.setItem('fuji_data-theme', systemTheme === 'dark' ? 'auto' : 'dark');
    } else {
        // if now in user mode and dark mode
        document.body.setAttribute('data-theme', 'light');
        // if the theme want to switch is system theme
        localStorage.setItem('fuji_data-theme', systemTheme === 'light' ? 'auto' : 'light');
    }

    // switch comment area theme
    // if this page has comment area
    let commentArea = document.querySelector('.post-comment');
    if (commentArea) {
        // if comment area loaded
        if (document.querySelector('span.post-comment-notloaded').getAttribute('style')) {
            if (commentArea.getAttribute('data-comment') === 'utterances') {
                updateUtterancesTheme(document.querySelector('.post-comment iframe'));
            }
            if (commentArea.getAttribute('data-comment') === 'disqus') {
                DISQUS.reset({
                    reload: true,
                });
            }
        }
    }
});
