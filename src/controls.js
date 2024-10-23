let player;

//Array for storing seasons {seasonID, textContent}
const SEASONS = [
];

//Array for storing episodes {episodeID,textContent,seasonID,location}
const EPISODES = [
];

//Array for storing issues for report form {issueID, value, label}
const ISSUES = [
];

//Array for storing subtitles {episodeID, seasonID, subtitlesID, location, lang, label}
const SUBTITLES = [
]

const topControlBar = document.querySelector('.top-control-bar');

let seasonSelector, episodeSelector;

let reportButton, closeReportButton;
let reportForm, formSended, reportSubmitButton;

function XYPlayerStart(passedPlayer) {
    player = passedPlayer;
    player.ready(function () {
        player.hlsQualitySelector();
        console.log("Player is ready")
    });

    //Making upper control bar responsive with same behaviour as bottom one
    player.on('userinactive', hideTopControlBar);
    player.on('useractive', showTopControlBar);

    player.on('play', () => {
        topControlBar.classList.add('visible')
    });
}

function resetControls(){
    loadSelectors().then(() => {
        loadSeason(seasonSelector.value)
    });
    createReportElements();
}

function removeSubtitleByID(subtitleID) {
    const index = SUBTITLES.findIndex(subtitle => subtitle.subtitlesID === subtitleID);
    if (index !== -1) {
        SUBTITLES.splice(index, 1);
    } else {
        console.log(`Subtitle with ID ${subtitleID} not found.`);
    }
}

function removeIssueByID(issueID) {
    const index = ISSUES.findIndex(issue => issue.id === issueID);
    if (index !== -1) {
        ISSUES.splice(index, 1);
    }
}

function removeSeasonByID(seasonID) {
    const index = SEASONS.findIndex(season => season.seasonID === seasonID);
    if (index !== -1) {
        SEASONS.splice(index, 1);
    }
}

function removeEpisodeByID(episodeID) {
    const index = EPISODES.findIndex(episode => episode.episodeID === episodeID);
    if (index !== -1) {
        EPISODES.splice(index, 1); 
    }
}

function removeSubtitle(index) {
    SUBTITLES.splice(index, 1);
}
function removeIssue(index) {
    ISSUES.splice(index, 1);
}
function removeSeason(index) {
    SEASONS.splice(index, 1);
}
function removeEpisode(index) {
    EPISODES.splice(index, 1);
}

function addSubtitle(episodeID, seasonID, subtitlesID, location, lang, label) {
    SUBTITLES.push({ episodeID: episodeID, seasonID: seasonID, subtitlesID: subtitlesID, location: location, lang: lang, label: label });
}

function addIssue(issueID, value, label) {
    ISSUES.push({ issueID: issueID, value: value, label: label });
}

function addSeason(seasonID, textContent) {
    SEASONS.push({ seasonID: seasonID, textContent: textContent });
}

function addEpisode(episodeID, textContent, seasonID, location) {
    EPISODES.push({ episodeID: episodeID, textContent: textContent, seasonID: seasonID, location: location });
}

function loadSeason(seasonID) {
    parseEpisodes(seasonID).then(() => {
        var episodeID = episodeSelector.value;
        loadEpisode(seasonID, episodeID);
    }).catch(error => {
        console.error("Error while loading season: " + error);
    });

}

function parseEpisodes(seasonID) {
    return new Promise((resolve) => {
        episodeSelector.innerHTML = '';
        EPISODES.forEach(EPISODE => {
            if (EPISODE.seasonID != seasonID) {
                return;
            }
            let option = document.createElement('option')
            option.value = EPISODE.episodeID;
            option.textContent = EPISODE.textContent;
            episodeSelector.appendChild(option);
        })
        resolve();
    })
}

function loadEpisode(seasonID, episodeId) {
    EPISODES.forEach(EPISODE => {
        if (EPISODE.seasonID == seasonID && EPISODE.episodeID == episodeId) {
            setSource(EPISODE.location);
            loadSubtitles(EPISODE.episodeID, EPISODE.seasonID);
        }
    })
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

function loadSubtitles(episodeID, seasonID) {
    player.remoteTextTracks().tracks_.forEach(track => {
        player.removeRemoteTextTrack(track);
    });
    SUBTITLES.forEach(SUBTITLE => {
        if (SUBTITLE.episodeID == episodeID && SUBTITLE.seasonID == seasonID) {
            setSubtitles(SUBTITLE.location, SUBTITLE.lang, SUBTITLE.label)
        }
    })
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
        while (topControlBar.firstChild) {
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

        SEASONS.forEach(season => {
            const option = document.createElement('option');
            option.value = season.seasonID;
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
            loadEpisode(seasonSelector.value, episodeSelector.value);
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

    while (reportContainer.firstChild) {
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

    ISSUES.forEach(issue => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = issue.issueID;
        input.name = 'issue-type';
        input.classList.add('form-radio-input');
        input.value = issue.value;

        const label = document.createElement('label');
        label.classList.add('form-label-radio');
        label.htmlFor = issue.issueID;
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





