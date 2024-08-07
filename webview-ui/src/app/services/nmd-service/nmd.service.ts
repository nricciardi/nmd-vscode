import { Injectable, NgZone } from '@angular/core';
import { vscode } from '../../utilities/vscode';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NmdService {

  private callbackResults: Map<string, any[]> = new Map();
  private newCallbackResult: Subject<void>;

  constructor(private ngZone: NgZone) {

    this.newCallbackResult = new Subject();

    window.addEventListener('message', event => {
      const message = event.data; // The JSON data that the extension sent
      this.ngZone.run(() => {
          console.log(message);
          
          this.newCallbackResult.next();

          this.callbackResults.set("test", [message]);
      });
  });
  }


  /**
   * 
   * @param path document path
   * @param params 
   * @returns built document
   */
  public buildDocument(path: string, ...params: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      vscode.callCommand({
        name: "build-document",
        parameters: [path, ...params]
      });

      this.newCallbackResult.subscribe({
        next: () => {
          const results = this.callbackResults.get("build-document") ?? [];

          resolve(results.join(""));
        }
      })
    })
  }
}
