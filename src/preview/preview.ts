import * as vscode from 'vscode';
import * as fs from 'fs';


export class HtmlNmdPreviewPanel {

    private static panelViewType = "NmdPreview";
    private static panelTitle = "Nmd Preview";

    private _artifactPath: vscode.Uri;

    private _panel?: vscode.WebviewPanel;

    public onDispose?: () => void;

    public get artifactPath() {
        return this._artifactPath;
    }
    
    constructor(artifactPath: vscode.Uri, onDispose?: () => void) {
        this._artifactPath = artifactPath;
        this.onDispose = onDispose;
    }

    public createPanel() {
        this._panel = vscode.window.createWebviewPanel(
            HtmlNmdPreviewPanel.panelViewType,
            HtmlNmdPreviewPanel.panelTitle,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                
            }
        );

        if (this.onDispose) {
            this._panel.onDidDispose(this.onDispose);
        }
    }

    public renderPanel() {
        if (!this._panel) {
            this.createPanel();
        }

        this.updatePanelContent();
    }

    public updatePanelContent() {
        const filePath = this.artifactPath.fsPath;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        if (this._panel) {

            this._panel.webview.html = fileContent;
        }
    }
  }