import * as vscode from 'vscode';
import { CommandsManager } from './commands/commands-manager';
import { TextModifierSidebar } from './sidebar/text-modifier-sidebar';

export function activate(context: vscode.ExtensionContext) {

	const commandsManager = new CommandsManager();

	console.log('Congratulations, your extension "nmd-vscode" is now active!');

	const disposable = vscode.commands.registerCommand('nmd-vscode.create-dossier', async () => {

		commandsManager.handleCreateDossier();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
