import { Component} from '@angular/core';
import {VisualTileModel} from '../visualTile/visualTile';
import {Tile} from '../tile/tile';
import {TitleBar} from '../titleBar/titleBar';
import {InFocusVisual} from '../infocus/infocus'
import {PhoneAll} from '../mobile/all/all'

@Component({
    moduleId: module.id,
    selector: 'playground',
    templateUrl: 'playground.html',
    styleUrls: ['playground.css'],
    directives: [TitleBar, Tile, InFocusVisual, PhoneAll]
})
export class Playground {
    visuals: VisualTileModel[];
    names = ["Regular","Phone"];
    name = "Regular";
    constructor() {
        console.log('playground constructed');
        let arr = [];
        let names  = [{
            name: 'barchart',
            d3: false,
            displayName: 'Bar Chart'
        },{
            name: 'table',
            d3: false,
            displayName: 'Hello IVisual'
        },{
            name: 'hello',
            d3: true,
            displayName: 'Table'
        }]

        var condition =  d=>d.d3 ===false && d.name === 'barchart';
        names = names.filter(condition);
        for (let i = 0; i < 24; i++) {
            arr.push({
                //src: "http://visualplayground.azurewebsites.net/visuals/loader.html"
                src:"mockLoader/loader.html",
                name: names[i%names.length].name,
                displayName: names[i%names.length].displayName
            })
        }
        this.visuals = arr;
    }
}