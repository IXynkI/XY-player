# XY-Player

XY-Player is a media web-player based on [**Videojs**](https://github.com/videojs/video.js) and [**HLS-quality-selector**](https://github.com/chrisboustead/videojs-hls-quality-selector)

#### Features:
- **M3U8 Playlist Support**: Easily play M3U8 playlists with full compatibility.
- **Audio and Quality Track Selection**: Choose your preferred audio and video quality from the master playlist file.
- **Season and Episode Navigation**: Ability to select from different seasons and episodes.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Subtitles Support**: Ability to load and use subtitles.



## How to use
1. Install via npm `npm install xy-player`
2. Include it into your html page after dependecies
   ```html
   <link rel="stylesheet" href="css/xy-player-styles.min.css">
   <script src="xy-player.min.js"></script>
   ```
3. Add divs for player to use. It needs to have "top-control-bar" and "report-container" divs.
   ```html
    <div class="top-control-bar">
      <!-- Controls will be dynamically inserted here -->
    </div>

    <div class="report-container">
      <!-- Report elements will be dynamically inserted here -->
    </div>
   ```
4. Initialize it through
   ```javascript
    const videoID = "player";
    const videojsPlayer = videojs(videoID);
    XYPlayerStart(videojsPlayer);
   ```
## Methods

**addSeason(seasonID, textContent)** `void`  
Adds a season to the SEASONS table.

**addEpisode(episodeID, textContent, seasonID, location)** `void`  
Adds an episode to the EPISODES table.

**addIssue(issueID, value, label)** `void`  
Adds an issue to the ISSUES table for reporting.

**addSubtitle(episodeID, seasonID, subtitlesID, location, lang, label)** `void`  
Adds subtitles to the SUBTITLES table.

**resetControls()** `void`  
Deletes everything loaded inside the divs and reloads them.

**getSeasons()** `Array<{ seasonID: number, textContent: string }>`  
Returns an array of SEASONS.

**getEpisodes()** `Array<{ episodeID: number, textContent: string, seasonID: number, location: string }>`  
Returns an array of EPISODES.

**getIssues()** `Array<{ issueID: number, value: string, label: string }>`  
Returns an array of ISSUES.

**getSubtitles()** `Array<{ episodeID: number, seasonID: number, subtitlesID: number, location: string, lang: string, label: string }>`  
Returns an array of SUBTITLES.

## License
MIT. Copyright (c) Andrei Danilov (andreidanilov0440@outlook.com)
