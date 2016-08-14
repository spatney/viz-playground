import { Component} from '@angular/core';
import {VisualTileModel} from '../visualTile/visualTile';
import {Tile} from '../tile/tile';
import {TitleBar} from '../titleBar/titleBar';
import {InFocusVisual} from '../infocus/infocus';
import {PhoneAll} from '../mobile/all/all';
import {VisualService, VisualItem} from '../../services/visual';

@Component({
    moduleId: module.id,
    selector: 'playground',
    templateUrl: 'playground.html',
    styleUrls: ['playground.css'],
    directives: [TitleBar, Tile, InFocusVisual, PhoneAll],
    providers:[VisualService]
})
export class Playground {
    visuals: VisualTileModel[] = [];
    names = ["Regular", "Phone"];
    name = "Regular";
    constructor(private visualService: VisualService) {
        visualService.getVisuals().then(d=>this.load(d))
    }

    private load(visuals: VisualItem[]) {
        let arr:(VisualItem&VisualTileModel)[] = [];
        visuals = visuals.filter(d=>d.name==='barchart');
        
        for (let i = 0; i < 24; i++) {
            arr.push({
                //src: "http://visualplayground.azurewebsites.net/visuals/loader.html"
                src: "mockLoader/loader.html",
                name: visuals[i % visuals.length].name,
                displayName: visuals[i % visuals.length].displayName
            })
        }
        this.visuals = arr;
    }
}