'use strict';

const fs = require('fs').promises;
const path = require('path');
const settings = require('./preferences');
const remote = require('@electron/remote');


let loaded_files = {};

let active = {
    active_file: null,
    active_context: null
}

let file_list = document.getElementById("fileList");
let text_editor = document.getElementById("textEditor");
const ctxMenu = require('./menu').fileCtxMenu(remove_file);

function bestride_file(file_path) {
    if (file_path in loaded_files) return;

    this.file_path = file_path;
    this.editor_content = null;
    this.element = document.createElement("li");

    // Functions

    this.read = async function read() {
        return await fs.readFile(this.file_path, 'utf-8');
    }

    this.load = async function load() {
        this.editor_content = await this.read();
    }

    this.write = async function write(content) {
        fs.writeFile(this.file_path, content);
    }

    this.save = async function save() {
        this.write(this.editor_content);
    }

    // Initialize;

    let file = this;

   // let name = document.createElement("p");
    this.element.innerHTML = path.basename(file_path);

    //this.element.appendChild(name);

    this.element.onclick = function () {
        if (active.active_file !== null)
            active.active_file.editor_content = text_editor.value;

        active.active_file = file;
        text_editor.value = file.editor_content;
    }
    this.element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        active.active_context = file;
        ctxMenu.popup({ window: remote.getCurrentWindow() });
    });

    file_list.appendChild(this.element);
    loaded_files[file_path] = this;

    if (!settings.files.includes(file_path))
        settings.append_file(file_path);
}

function remove_file() {
    let file = active.active_context;

    if (file === active.active_file)
        text_editor.value = "";

    file_list.removeChild(file.element);
    settings.remove_file(file.file_path);
}

module.exports.loaded_files = loaded_files;
module.exports.bestride_file = bestride_file;
module.exports.active = active;
