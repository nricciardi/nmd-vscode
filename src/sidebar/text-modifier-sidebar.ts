import * as vscode from 'vscode';


export class TextModifierSidebar {
    public static currentPanel: TextModifierSidebar | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
  
    public static createOrShow(extensionUri: vscode.Uri) {
      const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
  
      if (TextModifierSidebar.currentPanel) {
        TextModifierSidebar.currentPanel._panel.reveal(column);
        return;
      }
  
      const panel = vscode.window.createWebviewPanel(
        'sidebarPanel',
        'Markdown Tools',
        column || vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );
  
      TextModifierSidebar.currentPanel = new TextModifierSidebar(panel, extensionUri);
    }
  
    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
      this._panel = panel;
      this._extensionUri = extensionUri;
  
      this._update();
  
      this._panel.onDidDispose(() => this.dispose(), null, []);
  
      this._panel.onDidChangeViewState(() => {
        if (this._panel.visible) {
          this._update();
        }
      }, null, []);
  
      this._panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'applyStyle':
              // Logica per applicare lo stile al testo selezionato
              return;
          }
        },
        null,
        []
      );
    }
  
    public dispose() {
        TextModifierSidebar.currentPanel = undefined;
  
      this._panel.dispose();
    }
  
    private _update() {
      this._panel.webview.html = this._getHtmlForWebview();
    }
  
    private _getHtmlForWebview() {
      return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Tools</title>
  </head>
  <body>import * as vscode from 'vscode';
    <h1>Markdown Tools</h1>
    <button onclick="applyStyle('bold')">Bold</button>
    <button onclick="applyStyle('italic')">Italic</button>
    <button onclick="applyStyle('code')">Code</button>
    <script>
      const vscode = acquireVsCodeApi();
  
      function applyStyle(style) {
        vscode.postMessage({
          command: 'applyStyle',
          style: style
        });
      }
    </script>
  </body>
  </html>`;
    }
  }