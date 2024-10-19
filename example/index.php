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
	<link rel="stylesheet" href="css/styles.css" ;>
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

	<script defer src="classes.js"></script>
	<script defer src="controls.js"></script>
</body>

</html>