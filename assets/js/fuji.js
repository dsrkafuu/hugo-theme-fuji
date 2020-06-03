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

// update medium-zoom theme
function updateMeidumTheme(mediumInst) {
    let targetTheme = getNowTheme();
    if (mediumInst) {
        mediumInst.detach();
        if (targetTheme === 'dark') {
            mediumInst = mediumZoom('.img-zoomable', {
                background: '#2f3136',
            });
        } else {
            mediumInst = mediumZoom('.img-zoomable', {
                background: '#fffffd',
            });
        }
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

// remove empty ul in toc if article only have ## and ###
var secondQueryOfToc = document.querySelectorAll('.sidebar-toc ul ul');
if (secondQueryOfToc.length > 0) {
    secondQueryOfToc.forEach((value, key, parent) => {
        if (value.innerText === '') {
            value.setAttribute('style', 'display: none;');
        }
    });
}

// to-top button
document.querySelector('.btn .btn-scroll-top').addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});

// init medium-zoom
var mediumInst; // medium-zoom instance
if (getNowTheme() === 'dark') {
    mediumInst = mediumZoom('.img-zoomable', {
        background: '#2f3136',
    });
} else {
    mediumInst = mediumZoom('.img-zoomable', {
        background: '#fffffd',
    });
}

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

    // update medium background
    updateMeidumTheme(mediumInst);
    // switch comment area theme
    // only works after comment area are initialized
    let commentArea = document.querySelector('.post-comment');
    let commentStatus = document.querySelector('span.post-comment-notloaded').getAttribute('style');
    if (commentStatus) {
        if (commentArea.getAttribute('data-comment') === 'utterances') {
            updateUtterancesTheme(document.querySelector('.post-comment iframe'));
        }
        if (commentArea.getAttribute('data-comment') === 'disqus') {
            DISQUS.reset({
                reload: true,
            });
        }
    }
});
