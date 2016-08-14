import { Component, Input } from '@angular/core';
import {VisualTile} from '../../visualTile/visualTile';

@Component({
    moduleId: module.id,
    selector: 'phone-landscape',
    styleUrls: ['landscape.css'],
    templateUrl: 'landscape.html',
    directives:[VisualTile]
})
export class PhoneLandscape {
     @Input() model;
     constructor(){
         
     }
}