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

    public async createDossier(path: vscode.Uri, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
                
        this.exec(`generate dossier -p ${path.path} -f`, f);
    }

    public async addDocumentToDossier(path: vscode.Uri, documentName: string, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
                
        this.exec(`dossier -p ${path.path} add -d ${documentName}`, f);
    }

    public async compileHtmlDossier(inputPath: vscode.Uri, outputPath: vscode.Uri, f: (error: ExecException | null, stdout: string, stderr: string) => void) {
        this.exec(`compile -f html --force dossier -i ${inputPath.path} -o ${outputPath.path}`, f); 
    }
}