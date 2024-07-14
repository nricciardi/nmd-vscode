import * as vscode from 'vscode';
import { NmdCliInterfacer } from '../nmd/nmd-cli-interfacer';
import path from 'path';
import { buildFileName } from '../utilities/fileUtility';
import { HtmlNmdPreviewPanel } from '../preview/preview';


export class CommandsManager {

    public async handleCreateDossier() {

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Select a directory',
            canSelectFiles: false,
            canSelectFolders: true
        };

        const folderUri = await vscode.window.showOpenDialog(options);

        const name = await vscode.window.showInputBox({ prompt: 'Enter the name for the dossier' });

		if (name && folderUri && folderUri[0]) {

            const nmdCliInterfacer = new NmdCliInterfacer();

            const lastDirName = buildFileName(name);
    
            const p = vscode.Uri.parse(path.join(folderUri[0].path, lastDirName));

			await nmdCliInterfacer.createDossier(name, p, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Dossier "${name}" created`);
                
                vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: p })
            });

		} else {
            vscode.window.showErrorMessage("Dossier name is invalid");
        }
    }

    private getOpenedDossier() {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if (workspaceFolders && workspaceFolders[0]) {

            const dossierPath = workspaceFolders[0];

            return dossierPath;

        } else {
            vscode.window.showErrorMessage("An opened dossier not found");

            throw new URIError();
        }
    }

    public async handleAddDocumentToDossier() {
        try {
            const dossierPath = this.getOpenedDossier();

            const documentName = await vscode.window.showInputBox({ prompt: 'Enter the new document name' });

            if (!documentName) {
                vscode.window.showErrorMessage("Document name is invalid");
                return;
            }

            const nmdCliInterfacer = new NmdCliInterfacer();

            nmdCliInterfacer.addDocumentToDossier(dossierPath.uri, documentName, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Added document ${documentName}`);
                
            });

        } catch (error) {
            // TODO
        }
    }

    public async handleCompileCurrentDossier() {

        try {

            const dossierPath = this.getOpenedDossier();

            const inputPath = dossierPath.uri;

            const outputPath = vscode.Uri.parse(path.join(inputPath.path, "build", `${buildFileName(dossierPath.name)}.html`));

            const nmdCliInterfacer = new NmdCliInterfacer();

            const theme = vscode.window.activeColorTheme;

            nmdCliInterfacer.compileDossier(inputPath, outputPath, "html", theme, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Dossier compiled`);
                
                const htmlNmdPreviewPanel = new HtmlNmdPreviewPanel(outputPath);

                htmlNmdPreviewPanel.renderPanel();
            });

        } catch (error) {
            // TODO
        }
    }

    public async handleWatchCurrentDossier() {

        try {

            const dossierPath = this.getOpenedDossier();

            const inputPath = dossierPath.uri;

            const outputPath = vscode.Uri.parse(path.join(inputPath.path, "build", `${buildFileName(dossierPath.name)}.html`));

            const nmdCliInterfacer = new NmdCliInterfacer();

            const theme = vscode.window.activeColorTheme;

            nmdCliInterfacer.watchDossier(inputPath, outputPath, "html", theme, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Watching dossier...`);

                const htmlNmdPreviewPanel = new HtmlNmdPreviewPanel(outputPath);

                htmlNmdPreviewPanel.renderPanel();
            });

        } catch (error) {
            // TODO
        }
    }

    public async handleCompileFile() {

        try {

            const options: vscode.OpenDialogOptions = {
                canSelectMany: false,
                openLabel: 'Select file',
                canSelectFiles: true,
                canSelectFolders: false
            };
    
            const filePath = await vscode.window.showOpenDialog(options);

            if (!filePath || !filePath[0]) {
                vscode.window.showErrorMessage("file not found");
                return;
            }

            const inputPath = filePath[0];          

            const outputPath = vscode.Uri.parse(path.join(
                                    path.dirname(inputPath.path),
                                    "build",
                                    buildFileName(path.basename(inputPath.path), "html")
                                ));

            const nmdCliInterfacer = new NmdCliInterfacer();

            const theme = vscode.window.activeColorTheme;

            nmdCliInterfacer.compileFile(inputPath, outputPath, "html", theme, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`File compiled and saved in "${outputPath.path}"`);

                const htmlNmdPreviewPanel = new HtmlNmdPreviewPanel(outputPath);

                htmlNmdPreviewPanel.renderPanel();
            });

        } catch (error) {
            // TODO
        }
    }

    public async handleCompileDossier() {

        try {

            const options: vscode.OpenDialogOptions = {
                canSelectMany: false,
                openLabel: 'Select dossier',
                canSelectFiles: false,
                canSelectFolders: true
            };
    
            const dossierPath = await vscode.window.showOpenDialog(options);

            if (!dossierPath || !dossierPath[0]) {
                vscode.window.showErrorMessage("dossier not found");
                return;
            }

            const inputPath = dossierPath[0];

            const outputPath = vscode.Uri.parse(path.join(inputPath.path, "build", `${buildFileName(path.basename(inputPath.path))}.html`));

            const nmdCliInterfacer = new NmdCliInterfacer();

            const theme = vscode.window.activeColorTheme;

            nmdCliInterfacer.compileDossier(inputPath, outputPath, "html", theme, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Dossier compiled and saved in "${inputPath.path}"`);
                
                const htmlNmdPreviewPanel = new HtmlNmdPreviewPanel(outputPath);

                htmlNmdPreviewPanel.renderPanel();
            });

        } catch (error) {
            // TODO
        }
    }
}