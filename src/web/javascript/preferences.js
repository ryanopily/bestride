const remote = require('@electron/remote');
const { app } = remote;

const Preferences = remote.require('preferences');

let settings = new Preferences(
    'Bestride',
    {
        'working_directory': app.getPath('home'),
        'files': []
    },
    {encrypt: false}
);

settings.append_file = function (file_path) {
    settings.files = [...settings.files, file_path];
}

settings.remove_file = function (file_path) {
    settings.files = settings.files.filter((file) => file !== file_path);
}

module.exports = settings;