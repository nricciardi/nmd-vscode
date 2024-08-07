import * as vscode from 'vscode';
import { exec, ExecException } from "child_process";

export class NmdCliInterfacer {

    private _nmdCli: string;

    public get nmdCli() {
        return this._nmdCli;
    }

    constructor() {
        this._nmdCli = "nmd";
    }

    private async exec(command: string, f: (error: ExecException | null, stdout: string, stderr: string) => void) {

        command = `${this.nmdCli} ${command}`;
        
        exec(command, f);
    }

    public async createDossier(name: string, path: vscode.Uri, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
                
        this.exec(`generate dossier -p ${path.path} -f -n "${name}"`, f);
    }

    public async addDocumentToDossier(path: vscode.Uri, documentName: string, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
                
        this.exec(`dossier -p ${path.path} add -d ${documentName}`, f);
    }

    public async compileDossier(inputPath: vscode.Uri, outputPath: vscode.Uri, format: string, theme: vscode.ColorTheme, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
        
        const t = NmdCliInterfacer.parseTheme(theme);
        
        this.exec(`compile -m ${t} -f ${format} --force dossier -i ${inputPath.path} -o ${outputPath.path}`, f); 
    }

    public async buildDocument(inputPath: vscode.Uri, outputPath: vscode.Uri, format: string, theme: vscode.ColorTheme, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
        
        const t = NmdCliInterfacer.parseTheme(theme);
        
        this.exec(`build -t ${t} -f ${format} -i ${inputPath.path} -o ${outputPath.path}`, f); 
    }

    private static parseTheme(theme: vscode.ColorTheme) {
        let t = "light";

        if (theme.kind == vscode.ColorThemeKind.Dark)
            t = "dark";

        if (theme.kind == vscode.ColorThemeKind.HighContrast)
            t = "high-contrast";

        if (theme.kind == vscode.ColorThemeKind.HighContrast)
            t = "high-contrast";

        return t;
    }
}