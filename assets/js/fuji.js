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

// remove empty ul in toc if article only have ## and ###
if (document.querySelectorAll('.sidebar-toc ul ul').length > 0) {
    document.querySelectorAll('.sidebar-toc ul ul').forEach((value, key, parent) => {
        value.setAttribute('style', 'display: none;');
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

// if in post page and using utterances
// add utterances comment loading indicator
if (document.querySelector('.post-loading')) {
    var commentStatus; // utterence status
    var commentLoadingTime = 0; // loading time passed
    var commentCheckInterval = self.setInterval(checkUtterances, 500);

    function checkUtterances() {
        if (document.querySelector('.post-comment .utterances')) {
            commentStatus = document.querySelector('.post-comment .utterances').getAttribute('style');
        }
        if (commentStatus) {
            clearInterval(commentCheckInterval);
            updateUtterancesTheme(document.querySelector('.post-comment iframe'));
            document.querySelector('.post-loading').setAttribute('style', 'display: none;');
        } else {
            if (++commentLoadingTime > 20) {
                clearInterval(commentCheckInterval);
                document.querySelector('.post-comment').setAttribute('style', 'display: none;');
                document.querySelector('.post-loading i').className = 'far fa-times-circle';
            }
        }
    }
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
    if (document.querySelector('.post-loading') && commentStatus) {
        updateUtterancesTheme(document.querySelector('.post-comment iframe'));
    }
    if (document.querySelector('#disqus_thread') && typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
        });
    }
});
