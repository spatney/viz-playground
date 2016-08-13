import { Component} from '@angular/core';
import {VisualTile, VisualTileModel} from '../visualTile/visualTile';
import {Tile} from '../tile/tile';
import {TitleBar} from '../titleBar/titleBar';

@Component({
    moduleId: module.id,
    selector: 'playground',
    templateUrl: 'playground.html',
    styleUrls: ['playground.css'],
    directives: [VisualTile, TitleBar, Tile]
})
export class Playground {
    visuals: VisualTileModel[];
    constructor() {
        console.log('playground constructed');
        let arr = [];
        for (let i = 0; i < 24; i++) {
            arr.push({
                src: "http://visualplayground.azurewebsites.net/visuals/loader.html"
            })
        }
        this.visuals = arr;
    }
}