const player = videojs('player', {
    controls: true,
    fluid: true,
    techOrder: ['html5'],
    plugins: {
        hlsQualitySelector: {
            displayCurrentQuality: true
        }
    }
});


const seasons = [
    { value: '1', textContent: '1st Season'},
    { value: '2', textContent: '2nd Season'}
];

const episodes = [
    {}
]


const issues = [
    { id: 'broken-link', value: 'broken-audio', label: 'Broken Audio' },
    { id: 'inappropriate-content', value: 'inappropriate-content', label: 'Inappropriate Content' },
    { id: 'playback-error', value: 'other', label: 'Other' }
];

const topControlBar = document.querySelector('.top-control-bar');

let seasonSelector, episodeSelector;

let reportButton, closeReportButton;
let reportForm, formSended, reportSubmitButton;

document.addEventListener('DOMContentLoaded', () => {
    loadSelectors().then(() => {
        loadSeason(seasonSelector.value)
    });
    createReportElements();

    player.ready(function () {
        player.hlsQualitySelector();
        
    });

});



//Making upper control bar responsive with same behaviour as bottom one
player.on('userinactive', hideTopControlBar);
player.on('useractive', showTopControlBar);

player.on('play', () => {
    topControlBar.classList.add('visible')
});

function addSeason(seasonId, textContent){
    seasons.push({ value: seasonId, textContent: textContent});
}

function parseEpisodes(seasonId) {
    return new Promise((resolve, reject) => {
        seasonId = parseInt(seasonId);
        switch (seasonId) {
            case 1: {
                episodeSelector.innerHTML = '';
                let option = document.createElement('option');
                option.value = '1';
                option.textContent = '1st Episode';
                episodeSelector.appendChild(option);
                resolve();
                break;
            }
            case 2: {
                episodeSelector.innerHTML = '';
                let option = document.createElement('option');
                option.value = '1';
                option.textContent = 'Another 1st Episode';
                episodeSelector.appendChild(option);
                resolve();
                break;
            }
            default:
                reject("Error while parsing episodes: Incorrect value passed");
        }
    })

}

function loadSeason(seasonId) {
    parseEpisodes(seasonId).then(() => {
        var episodeId = episodeSelector.value;
        loadEpisode(episodeId);
    }).catch(error => {
        console.error("Error while loading season: " + error);
    });

}

function loadEpisode(episodeId) {
    if (seasonSelector.value == 1) {
        setSource("videos\\First Season\\First Episode\\master.m3u8");
        loadSubtitles(episodeId);
    } else {
        setSource("videos\\Second Season\\First Episode\\master.m3u8");
        loadSubtitles(episodeId);
    }
}

function setSource(src) {
    player.src({
        src: src,
        type: "application/x-mpegURL"
    });
}

function toggleReportForm() {
    if (reportForm.classList.contains('hidden')) {
        reportForm.classList.remove('hidden');
    } else {
        reportForm.classList.add('hidden');
    }
}

function showTopControlBar() {
    topControlBar.classList.add('visible');
}

function hideTopControlBar() {
    topControlBar.classList.remove('visible');
}

function fadeOut(element) {
    let opacity = 1;
    let fadeEffect = setInterval(() => {
        if (opacity <= 0) {
            clearInterval(fadeEffect);
            element.style.opacity = 0;
            return;
        }
        opacity -= 0.025;
        element.style.opacity = opacity;
    }, 50);
}

function loadSubtitles(value) {
    if (value == 1) {
        setSubtitles("videos\\First Season\\First Episode\\Subtitles\\First_video_english.vtt", "en", "English");
        setSubtitles("videos\\First Season\\First Episode\\Subtitles\\First_video_russian.vtt", "ru", "Russian");
    } else {
        setSubtitles("videos\\Second Season\\First Episode\\Subtitles\\First_video_english.vtt", "en", "English");
        setSubtitles("videos\\Second Season\\First Episode\\Subtitles\\First_video_russian.vtt", "ru", "Russian");
    }
}

function setSubtitles(src, lang, label) {
    player.addRemoteTextTrack({
        kind: 'subtitle',
        src: src,
        srclang: lang,
        label: label
    }, false);
}


function loadSelectors() {
    return new Promise((resolve) => {
        while(topControlBar.firstChild){
            topControlBar.removeChild(topControlBar.firstChild);
        }

        const leftSide = document.createElement('div');
        leftSide.classList.add('control-bar-upper-left-side');

        const rightSide = document.createElement('div');
        rightSide.classList.add('control-bar-upper-right-side');

        const seasonSection = document.createElement('section');
        seasonSection.classList.add('select-season-episode');

        seasonSelector = document.createElement('select');
        seasonSelector.id = 'season-selector';
        seasonSelector.name = 'Season';

        seasonSelector.addEventListener('change', () => {
            loadSeason(seasonSelector.value);
        });

        seasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season.value;
            option.textContent = season.textContent;
            seasonSelector.appendChild(option);
        })

        seasonSection.appendChild(seasonSelector);

        const episodeSection = document.createElement('section');
        episodeSection.classList.add('select-season-episode');

        episodeSelector = document.createElement('select');
        episodeSelector.id = 'episode-selector';
        episodeSelector.name = 'Episode';

        episodeSelector.addEventListener('change', () => {
            loadEpisode(episodeSelector.value);
        });

        episodeSection.appendChild(episodeSelector);

        leftSide.appendChild(seasonSection);
        leftSide.appendChild(episodeSection);

        reportButton = document.createElement('button');
        reportButton.classList.add('report-button');
        reportButton.setAttribute('aria-label', 'Report Issue');

        reportButton.addEventListener('click', () => {
            toggleReportForm();
        });

        const reportIcon = document.createElement('i');
        reportIcon.classList.add('fa-solid', 'fa-triangle-exclamation');

        reportButton.appendChild(reportIcon);

        rightSide.appendChild(reportButton);

        topControlBar.appendChild(leftSide);
        topControlBar.appendChild(rightSide);
        resolve();
    })
}

function createReportElements() {
    const reportContainer = document.querySelector('.report-container');

    while(reportContainer.firstChild){
        reportContainer.removeChild(reportContainer.firstChild);
    }

    formSended = document.createElement('div');
    formSended.classList.add('form-sended');
    formSended.innerHTML = `
        <i class="fa-solid fa-check"></i>
        <span class="form-sended-text">Thank you for your report!<br>We will look into it when we would be able to</span>
    `;

    reportForm = document.createElement('form');
    reportForm.classList.add('report-form', 'hidden');

    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    const closeButtonDiv = document.createElement('div');
    closeReportButton = document.createElement('button');
    closeReportButton.classList.add('close-report-button');
    closeReportButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    closeReportButton.addEventListener('click', () => {
        toggleReportForm()
    })

    closeButtonDiv.appendChild(closeReportButton);

    reportForm.appendChild(closeButtonDiv);

    issues.forEach(issue => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = issue.id;
        input.name = 'issue-type';
        input.classList.add('form-radio-input');
        input.value = issue.value;

        const label = document.createElement('label');
        label.classList.add('form-label-radio');
        label.htmlFor = issue.id;
        label.textContent = issue.label;

        div.appendChild(input);
        div.appendChild(label);
        reportForm.appendChild(div);
    });
    const descriptionDiv = document.createElement('div');
    descriptionDiv.style.display = 'flex';
    descriptionDiv.style.flexDirection = 'column';

    const descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('form-label-description');
    descriptionLabel.htmlFor = 'textarea-description';
    descriptionLabel.textContent = 'Describe your issue';

    const textarea = document.createElement('textarea');
    textarea.id = 'textarea-description';
    textarea.name = 'issue-description';
    textarea.classList.add('form-textarea');
    textarea.maxLength = 255;

    descriptionDiv.appendChild(descriptionLabel);
    descriptionDiv.appendChild(textarea);

    const submitDiv = document.createElement('div');
    submitDiv.style.display = 'flex';
    submitDiv.style.flexDirection = 'row-reverse';

    reportSubmitButton = document.createElement('button');
    reportSubmitButton.setAttribute('aria-label', 'Submit report');
    reportSubmitButton.classList.add('submit-form-button');
    reportSubmitButton.type = 'submit';
    reportSubmitButton.innerHTML = '<label class="submit-form-label">Submit</label>';

    reportSubmitButton.addEventListener('click', () => {
        reportForm.classList.add('hidden');
        fadeOut(formSended);
    })

    submitDiv.appendChild(reportSubmitButton);

    
    reportForm.appendChild(descriptionDiv);
    reportForm.appendChild(submitDiv);

    reportContainer.appendChild(formSended);
    reportContainer.appendChild(reportForm);
}





