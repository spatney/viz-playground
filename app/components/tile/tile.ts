import { Component, Input } from '@angular/core';
import {VisualTile, VisualTileModel} from '../visualTile/visualTile';

@Component({
    moduleId: module.id,
    selector: 'tile',
    styleUrls: ['tile.css'],
    templateUrl: 'tile.html',
    directives: [VisualTile]
})
export class Tile {
    @Input() model: VisualTileModel;
    constructor() { }
}