'use strict';

// toggle theme
function toggleTheme() {
    $('body').attr('data-theme', (index, attr) => {
        if (attr === 'light') {
            localStorage.setItem('fuji_theme', 'dark');
            return 'dark';
        } else {
            localStorage.setItem('fuji_theme', 'light');
            return 'light';
        }
    });
}

// update medium-zoom theme
// @params targetTheme, mediumInst
function updateMeidumTheme(targetTheme, mediumInst) {
    if (targetTheme && mediumInst) {
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
// @params targetTheme, utterancesFrame
function updateUtterancesTheme(targetTheme, utterancesFrame) {
    if (targetTheme && utterancesFrame) {
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

// to-top button
$('.btn .btn-scroll-top').on('click', () => {
    $('html, body').animate({
        scrollTop: 0,
    });
});

// toc anchors
$('.sidebar-toc a').on('click', (event) => {
    $('html, body').animate({
        scrollTop: $($(event.currentTarget).attr('href')).offset().top,
    });
});

// remove empty ul in toc if article only have ## and ###
if ($('.sidebar-toc ul ul').length > 0 && $('.sidebar-toc ul ul li').text() === '') {
    $('.sidebar-toc ul ul').hide();
}

// init medium-zoom
var mediumInst; // medium-zoom instance
if ($('body').attr('data-theme') === 'dark') {
    mediumInst = mediumZoom('.img-zoomable', {
        background: '#2f3136',
    });
} else {
    mediumInst = mediumZoom('.img-zoomable', {
        background: '#fffffd',
    });
}

// init highlight.js
hljs.initHighlighting();

// if in post page and using utterances
// add utterances comment loading indicator
if ($('.post-loading').length >= 1) {
    var commentStatus; // utterence status
    var commentLoadingTime = 0; // loading time passed
    var commentCheckInterval = self.setInterval(checkUtterances, 500);

    function checkUtterances() {
        commentStatus = $('.post-comment .utterances').attr('style');
        if (commentStatus) {
            clearInterval(commentCheckInterval);
            updateUtterancesTheme($('body').attr('data-theme'), $('.post-comment iframe')[0]);
            $('.post-loading').hide();
        } else {
            if (++commentLoadingTime > 20) {
                clearInterval(commentCheckInterval);
                $('.post-comment').hide();
                $('.post-loading i').attr('class', 'far fa-times-circle');
            }
        }
    }
}

// init theme switch button
$('.btn .btn-toggle-mode').on('click', () => {
    // toggle theme
    toggleTheme();
    // update medium background
    updateMeidumTheme($('body').attr('data-theme'), mediumInst);
    // switch comment area theme
    // only works after comment area are initialized
    if ($('.post-loading').length >= 1 && commentStatus) {
        updateUtterancesTheme($('body').attr('data-theme'), $('.post-comment iframe')[0]);
    }
    if ($('#disqus_thread').length >= 1 && typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
        });
    }
});
