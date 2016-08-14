import { Component, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import {VisualTileModel, VisualTile} from '../visualTile/visualTile'

@Component({
  moduleId: module.id,
  selector: 'infocus-visual',
  styleUrls: ['infocus.css'],
  templateUrl:'infocus.html',
  directives:[VisualTile]
})
export class InFocusVisual {
  @Input() model;
  constructor(private sanitizer: DomSanitizationService) {
  }

  getSanitizedSrc(model: VisualTileModel) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(model.src);
  }
}