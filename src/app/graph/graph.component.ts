import { Component, OnInit, ElementRef } from '@angular/core';

import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    private d3: D3;
    private parentNativeElement: any;

    constructor(element: ElementRef, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }


    ngOnInit() {
        let d3 = this.d3;
        let d3ParentElement: Selection<any, any, any, any>;

        if (this.parentNativeElement !== null) {

            d3ParentElement = d3.select(this.parentNativeElement);

            // Do more D3 things

        }
    }

}
