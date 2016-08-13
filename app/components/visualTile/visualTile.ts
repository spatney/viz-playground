import { Component, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

export interface VisualTileModel{
  src: string
}
@Component({
  moduleId: module.id,
  selector: 'visual-tile',
  styleUrls:['visualTile.css'],
  template: '<iframe name="abc123" [src]="getSanitizedSrc(model)" sandbox="allow-scripts allow-same-origin" frameborder="0"></iframe>'
})
export class VisualTile {
  @Input() model;
  constructor(private sanitizer: DomSanitizationService) {
  }

  getSanitizedSrc(model: VisualTileModel){
    return this.sanitizer.bypassSecurityTrustResourceUrl(model.src);
  }
}