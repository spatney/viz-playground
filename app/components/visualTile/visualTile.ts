import { Component, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

export interface VisualTileModel {
  src: string,
  name: string,
  displayName: string
}
@Component({
  moduleId: module.id,
  selector: 'visual-tile',
  styleUrls: ['visualTile.css'],
  templateUrl: 'visualTile.html'
})
export class VisualTile {
  @Input() model;
  constructor(private sanitizer: DomSanitizationService) { }

  getSanitizedSrc(model: VisualTileModel) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(model.src);
  }
}