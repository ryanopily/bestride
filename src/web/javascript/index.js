'use strict';

const remote = require('@electron/remote');
const { app, dialog } = remote;

const fs = require('fs').promises;
const path = require('path');

const settings = require('./preferences');
const bestridef = require('./bestride_file');


let file_list = document.getElementById("fileList");
let text_editor = document.getElementById("textEditor");

// Clear the 'active file' and the text editor
function new_file() {
    text_editor.value = "";
    bestridef.active.active_file = null;
}

// Let user choose a file to open
async function open_file() {
    let response = await dialog.showOpenDialog();
    if (!response.canceled) open_file_as(response.filePaths[0]);
}

// Open a specific file with the option to create it if it doesn't exist.
async function open_file_as(file_path, options = { create: false, content: "" }) {
    let file = new bestridef.bestride_file(file_path);
    if (options.create) file.write(options.content);

    await file.load();
    file.element.onclick();
}

async function save_file() {
    // Save changes to the current file
    if (bestridef.active.active_file !== null) {
        bestridef.active.active_file.editor_content = text_editor.value;
        bestridef.active.active_file.save();
    }
    // Save editor contents to a new file
    else {
        let response = await dialog.showSaveDialog();
        if (!response.canceled)
            open_file_as(response.filePath, { create: true, content: text_editor.value });
    }
}

for (let file of settings.files) open_file_as(file);

module.exports.new_file = new_file;
module.exports.open_file = open_file;
module.exports.save_file = save_file;