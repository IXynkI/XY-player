<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Custom Video JS player</title>
	<script src="https://kit.fontawesome.com/e31cff440d.js" crossorigin="anonymous"></script>
	<link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
	<script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>

	<link href="videojs-hls-quality-selector/videojs-hls-quality-selector.css" rel="stylesheet" />
	<script src="videojs-hls-quality-selector/videojs-hls-quality-selector.min.js"></script>
	<link rel="stylesheet" href="xy-player/xy-player-styles.min.css">
</head>

<body>
	<div class="player-wrapper">
		<div class="video-parent">
			<div class="top-control-bar">

			</div>
			<div class="report-container">

			</div>
			<div class="video-container">
				<video
					id="player"
					class="video-js"
					controls
					preload="auto"
					width="640"
					height="264"
					data-setup="{}">


					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a
						web browser that
						<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					</p>
				</video>
			</div>
		</div>
	</div>
	<script src="xy-player/xy-player.min.js"></script>
	<script>
		const videoID = "player";
		const videojsPlayer = videojs(videoID, {
			controls: true,
			fluid: true,
			techOrder: ['html5'],
			plugins: {
				hlsQualitySelector: {
					displayCurrentQuality: true
				}
			}
		});

		// Pass the player instance to load XYPlayer
		XYPlayerStart(videojsPlayer);

		//Loading videos and adding them as episodes in seasons as well as loading subtitles
		//seasonID,textContent
		addSeason("1", "First Season");
		addSeason("2", "Second Season");

		//episodeID, textContent, seasonID, location
		addEpisode("1", "First Episode", "1", "videos\\First Season\\First Episode\\master.m3u8")
		addEpisode("1", "First Episode", "2", "videos\\Second Season\\First Episode\\master.m3u8")
		addEpisode("2", "Second Episode", "2", "videos\\Second Season\\Second Episode\\master.m3u8")

		//episodeID, seasonID, subtitlesID, location, lang, label
		addSubtitle("1", "1", "1", "videos\\First Season\\First Episode\\Subtitles\\First_video_english.vtt",
			"en", "English");
		addSubtitle("1", "1", "2", "videos\\First Season\\First Episode\\Subtitles\\First_video_russian.vtt",
			"ru", "Russian");
		addSubtitle("1", "2", "3", "videos\\Second Season\\First Episode\\Subtitles\\First_video_english.vtt",
			"en", "English");
		addSubtitle("1", "2", "4", "videos\\Second Season\\First Episode\\Subtitles\\First_video_russian.vtt",
			"ru", "Russian");
		addSubtitle("2", "2", "5", "videos\\Second Season\\Second Episode\\Subtitles\\First_video_english.vtt",
			"en", "English");
		addSubtitle("2", "2", "6", "videos\\Second Season\\Second Episode\\Subtitles\\First_video_russian.vtt",
			"ru", "Russian");
		
		//Custom Issue for report window
		//issueID, value, label
		addIssue("custom-issue", "custom-issue", "Custom Issue");

		//Call resetControls to load new info
		resetControls()

	</script>
</body>

</html>