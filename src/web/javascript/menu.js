'use strict';

const remote = require('@electron/remote')
const { dialog, Menu, MenuItem } = remote;

const index = require('./index.js');
const bestridef = require('./bestride_file');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New File...',
                click: file_click,
                accelerator: "CommandOrControl+N",
                id: 1
            },
            {
                label: 'Open File...',
                click: file_click,
                accelerator: "CommandOrControl+O",
                id: 2
            },
            {
                label: 'Save File...',
                click: file_click,
                accelerator: "CommandOrControl+S",
                id: 3
            },
            {
                label: 'Save File As...',
                click: file_click,
                accelerator: "Shift+S",
                id: 4
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                role: 'seperator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'delete'
            }

        ]
    },

    {
        label: 'Options',
        submenu: [
            {
                role: 'toggleDevTools'
            }
        ]
    }
];

async function file_click(menuItem, window, event) {
    if (menuItem.id == 1) {
        console.log("New file. ");
        index.new_file();
    }

    else if (menuItem.id == 2) {
        console.log("Opening file. ");
        index.open_file();
    }

    else if (menuItem.id == 3) {
        index.save_file();
    }

    else if (menuItem.id == 4) {
        bestridef.active.active_file = null;
        index.save_file();
    }
}

function fileCtxMenu(callback) {
    let menu = new Menu();

    menu.append(new MenuItem({
        label: 'Remove',
        click: callback
    }));

    return menu
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports.fileCtxMenu = fileCtxMenu;