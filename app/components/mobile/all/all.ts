import { Component, Input } from '@angular/core';
import {PhonePotrait} from '../potrait/potrait'
import {PhoneLandscape} from '../landscape/landscape'
import {PhoneLandscape as PhoneLandscapeDash} from '../landscapeDashboard/landscape'

@Component({
    moduleId: module.id,
    selector: 'phone-all',
    styleUrls: ['all.css'],
    templateUrl: 'all.html',
    directives:[PhonePotrait, PhoneLandscape, PhoneLandscapeDash]
})
export class PhoneAll {
     @Input() model;
     constructor(){
         
     }
}