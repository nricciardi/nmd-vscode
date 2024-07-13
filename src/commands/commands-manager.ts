import * as vscode from 'vscode';
import { NmdCliInterfacer } from '../nmd/nmd-cli-interfacer';
import path from 'path';
import { buildFileName } from '../utilities/fileUtility';
import { HtmlNmdPreviewPanel } from '../preview/preview';


export class CommandsManager {

    public async handleCreateDossier() {

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: false,
            canSelectFolders: true
        };

        const folderUri = await vscode.window.showOpenDialog(options);

        const title = await vscode.window.showInputBox({ prompt: 'Enter the title for the dossier' });

		if (title && folderUri && folderUri[0]) {

            const nmdCliInterfacer = new NmdCliInterfacer();

            const lastDirName = buildFileName(title);
    
            const p = vscode.Uri.parse(path.join(folderUri[0].path, lastDirName));

			await nmdCliInterfacer.createDossier(p, (err, stdout, stderr) => {

                if(err) {
                    vscode.window.showErrorMessage(err.message);
                    return;
                }

                vscode.window.showInformationMessage(`Dossier "${title}" created`);
                
                vscode.workspace.updateWorkspaceFolders(vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders.length : 0, null, { uri: p })
            });

		} else {
            vscode.window.showErrorMessage("Dossier title is invalid");
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

    public async handleCompileDossier() {

        try {

            const dossierPath = this.getOpenedDossier();

            const inputPath = dossierPath.uri;

            const outputPath = vscode.Uri.parse(path.join(inputPath.path, "build", `${buildFileName(dossierPath.name)}.html`));

            const nmdCliInterfacer = new NmdCliInterfacer();

            nmdCliInterfacer.compileHtmlDossier(inputPath, outputPath, (err, stdout, stderr) => {

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
}