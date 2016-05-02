(function() {
  var Colors, DIRECTORY, DL, Downloader, FOLDER, GENERATE, PASSWORD, PLAYLIST, Program, USERNAME, getUserHome;

  require('coffee-script');

  Colors = require('colors');

  Program = require('commander');

  Downloader = require('./lib/downloader');

  getUserHome = (function(_this) {
    return function() {
      if (process.platform === 'win32') {
        return process.env['USERPROFILE'];
      }
      return process.env['HOME'];
    };
  })(this);

  Program.version('0.0.3')
  .option('-u, --username [username]', 'Spotify Username (required)', null)
  .option('-p, --password [password]', 'Spotify Password (required)', null)

  .option('-i, --uri [uri]', 'Spotify URI (Track / Album / Playlist)', null)

  .option('-d, --directory [directory]', 'Directory you want to save the MP3s to. Default: ' + (getUserHome()) + '/spotify-mp3s', (getUserHome()) + '/spotify-mp3s')

  .parse(process.argv);

  USERNAME = "SpotiyFree97"; //Program.username;
  PASSWORD = "Spotifree97"; //Program.password;

  if(USERNAME == null || PASSWORD == null) {
    console.log(('Must specify a Spotify Username and Password!').red);
    return Program.outputHelp();
  }

  DIRECTORY = Program.directory;

  URI = Program.uri;

  if (URI == null) {
    console.log('Must specify a Spotify URI!'.red);
    return Program.outputHelp();
  }
  var split = URI.split(":");
  if(split == null || split[0] != "spotify") {
    console.log(('Not a valid Spotify URI!').red);
    return Program.outputHelp();
  }

  TYPE = split[1];
  if(TYPE == "user")
    TYPE = split[3];

  FOLDER = Program.folder;

  DL = new Downloader(USERNAME, PASSWORD, DIRECTORY, TYPE, URI);

  if (FOLDER) {
	   DL.makeFolder = true;
  }

  DL.run();

}).call(this);
