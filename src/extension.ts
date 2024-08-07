import * as vscode from 'vscode';
import { CommandsManager } from './commands/commands-manager';
import { TextModifierSidebar } from './sidebar/text-modifier-sidebar';
import { EditorPanel } from './panels/editor-panel';

export function activate(context: vscode.ExtensionContext) {

	const showHelloWorldCommand = vscode.commands.registerCommand("hello-world.showHelloWorld", () => {
		EditorPanel.render(context.extensionUri);
	  });
	
	  // Add command to the extension context
	  context.subscriptions.push(showHelloWorldCommand);

	// const commandsManager = new CommandsManager();

	// console.log('Congratulations, your extension "nmd-vscode" is now active!');

	// const createDossierCommand = vscode.commands.registerCommand('nmd-vscode.create-dossier', async () => {

	// 	commandsManager.handleCreateDossier();
	// });

	// context.subscriptions.push(createDossierCommand);

	// const AddDocumentToDossierCommand = vscode.commands.registerCommand('nmd-vscode.add-document-to-dossier', async () => {

	// 	commandsManager.handleAddDocumentToDossier();
	// });

	// context.subscriptions.push(createDossierCommand);

	// const compileCurrentDossierCommand = vscode.commands.registerCommand('nmd-vscode.compile-current-dossier', async () => {

	// 	commandsManager.handleCompileCurrentDossier();
	// });

	// context.subscriptions.push(compileCurrentDossierCommand);

	// const compileDossierCommand = vscode.commands.registerCommand('nmd-vscode.compile-dossier', async () => {

	// 	commandsManager.handleCompileDossier();
	// });

	// context.subscriptions.push(compileDossierCommand);

	// const compileFileCommand = vscode.commands.registerCommand('nmd-vscode.compile-file', async () => {

	// 	commandsManager.handleCompileFile();
	// });

	// context.subscriptions.push(compileFileCommand);

	// const watchDossierCommand = vscode.commands.registerCommand('nmd-vscode.watch-current-dossier', async () => {

	// 	commandsManager.handleWatchCurrentDossier();
	// });

	// context.subscriptions.push(watchDossierCommand);
}

export function deactivate() {}
