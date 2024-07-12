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
}