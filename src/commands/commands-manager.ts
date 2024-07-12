import * as vscode from 'vscode';
import { NmdCliInterfacer } from '../nmd/nmd-cli-interfacer';
import path from 'path';
import { buildFileName } from '../utilities/fileUtility';


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
}