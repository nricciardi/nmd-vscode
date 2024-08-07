import { Component } from '@angular/core';
import { NmdService } from '../../services/nmd-service/nmd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {

    builtDocument?: string;

    constructor(private nmdService: NmdService) {

    }

    async ngOnInit() {
      this.builtDocument = await this.nmdService.buildDocument("/home/ncla/Desktop/data/nmd/nmd-cli/test-resources/nmd-test-dossier-1");
    }
}
