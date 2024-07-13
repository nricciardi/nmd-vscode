import * as vscode from 'vscode';
import { CommandsManager } from './commands/commands-manager';
import { TextModifierSidebar } from './sidebar/text-modifier-sidebar';

export function activate(context: vscode.ExtensionContext) {

	const commandsManager = new CommandsManager();

	console.log('Congratulations, your extension "nmd-vscode" is now active!');

	const createDossierCommand = vscode.commands.registerCommand('nmd-vscode.create-dossier', async () => {

		commandsManager.handleCreateDossier();
	});

	context.subscriptions.push(createDossierCommand);

	const AddDocumentToDossierCommand = vscode.commands.registerCommand('nmd-vscode.add-document-to-dossier', async () => {

		commandsManager.handleAddDocumentToDossier();
	});

	context.subscriptions.push(createDossierCommand);

	const compileDossierCommand = vscode.commands.registerCommand('nmd-vscode.compile-dossier', async () => {

		commandsManager.handleCompileDossier();
	});

	context.subscriptions.push(compileDossierCommand);
}

export function deactivate() {}
