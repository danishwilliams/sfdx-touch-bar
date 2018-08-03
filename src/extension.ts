'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "sfdx-touch-bar" is now active!');

    let outputChannel = vscode.window.createOutputChannel('sfdxTouchBarOutputChannel');
    let statusBarItem = vscode.window.createStatusBarItem();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let sfdxOrgList = vscode.commands.registerCommand('extension.sfdxOrgList', () => {
        // The code you place here will be executed every time your command is executed
        statusBarItem.text = "Getting org list...";
        statusBarItem.show();

        execCommand(statusBarItem, outputChannel, 'sfdx force:org:list');
    });

    let sfdxStatus = vscode.commands.registerCommand('extension.sfdxStatus', () => {
        statusBarItem.text = "Getting source status...";
        statusBarItem.show();

        execCommand(statusBarItem, outputChannel, 'sfdx force:source:status');
    });

    let sfdxPush = vscode.commands.registerCommand('extension.sfdxPush', () => {
        statusBarItem.text = "Pushing...";
        statusBarItem.show();

        execCommand(statusBarItem, outputChannel, 'sfdx force:source:push');
    });

    let sfdxPull = vscode.commands.registerCommand('extension.sfdxPull', () => {
        statusBarItem.text = "Pulling...";
        statusBarItem.show();

        execCommand(statusBarItem, outputChannel, 'sfdx force:source:pull');
    });

    context.subscriptions.push(sfdxOrgList, sfdxStatus, sfdxPush, sfdxPull);

    function execCommand(statusBarItem: vscode.StatusBarItem, outputChannel: vscode.OutputChannel, command: String) {
        var exec = require('child_process').exec;
        exec(command, { cwd: vscode.workspace.rootPath }, function (error: string, stdout: string, stderr: string) {
            processExecResult(statusBarItem, outputChannel, stdout, stderr, error);
        });
    }

    function processExecResult(statusBarItem: vscode.StatusBarItem, outputChannel: vscode.OutputChannel, stdout: string, stderr: string, error: string) {
        statusBarItem.hide();
        outputChannel.show(true);

        outputChannel.appendLine(stdout);

        if (stderr !== '') {
            outputChannel.show(true);
            outputChannel.appendLine(stderr);
        }
        if (error !== null) {
            outputChannel.show(true);
            outputChannel.appendLine(error);
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}