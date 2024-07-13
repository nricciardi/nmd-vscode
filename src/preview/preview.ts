import * as vscode from 'vscode';
import * as fs from 'fs';


export class HtmlNmdPreviewPanel {

    private static panelViewType = "NmdPreview";
    private static panelTitle = "Nmd Preview";

    private _artifactPath: vscode.Uri;

    private panel?: vscode.WebviewPanel;

    public get artifactPath() {
        return this._artifactPath;
    }
    
    constructor(artifactPath: vscode.Uri) {
        this._artifactPath = artifactPath;
    }

    public createPanel() {
        this.panel = vscode.window.createWebviewPanel(
            HtmlNmdPreviewPanel.panelViewType,
            HtmlNmdPreviewPanel.panelTitle,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                
            }
        );
    }

    public renderPanel() {
        if (!this.panel) {
            this.createPanel();
        }

        this.updatePanelContent();
    }

    public updatePanelContent() {
        const filePath = this.artifactPath.fsPath;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        if (this.panel) {

            this.panel.webview.html = fileContent;
        }
    }
  }