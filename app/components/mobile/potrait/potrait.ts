import { Component, Input } from '@angular/core';
import {VisualTile} from '../../visualTile/visualTile';

@Component({
    moduleId: module.id,
    selector: 'phone-potrait',
    styleUrls: ['potrait.css'],
    templateUrl: 'potrait.html',
    directives:[VisualTile]
})
export class PhonePotrait {
     @Input() model;
     constructor(){
         
     }
}