import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track';

@Component({
    selector: 'app-track-item',
    templateUrl: './track-item.component.html',
    styleUrls: ['./track-item.component.scss']
})
export class TrackItemComponent implements OnInit {

    @Input() track: Track;

    constructor() { }

    ngOnInit(): void {
    }

}
