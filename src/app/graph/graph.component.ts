import { Component, OnInit, ElementRef } from '@angular/core';

import { D3Service, D3, Selection, ScaleOrdinal, ZoomBehavior } from 'd3-ng2-service';

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
    private d3: D3;
    private parentNativeElement: any;
    width = 960;
    height = 500;
    fill;
    outer;
    vis;
    force;
    drag_line;
    // layout properties
    nodes;
    links;
    node;
    link;
    text;
    // mouse event vars
    selected_node;
    selected_link;
    mousedown_link;
    mousedown_node;
    mouseup_node;

    constructor(
        element: ElementRef,
        d3Service: D3Service
    ) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }


    ngOnInit() {
        const d3 = this.d3;
        let d3ParentElement: Selection<any, any, any, any>;
        this.fill = d3.scaleOrdinal(d3.schemeCategory20);

        if (this.parentNativeElement !== null) {

            d3ParentElement = d3.select(this.parentNativeElement);

            // Do more D3 things
            // init svg
            this.outer = d3.select("#chart")
                .append("svg:svg")
                .attr("width", this.width)
                .attr("height", this.height)
                .attr("pointer-events", "all");
            this.vis = this.outer.append('svg:g')
                .call(d3.zoom().on("zoom", this.rescale))
                .on("dblclick.zoom", null)
                .append('svg:g')
            // .on("mousemove", this.mousemove)
            // .on("mousedown", this.mousedown)
            // .on("mouseup", this.mouseup);
            this.vis.append('svg:rect')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('fill', 'white');

            // init force layout
            this.force = d3.forceSimulation()
            // .size([this.width, this.height])
            // .nodes([])
            // .linkDistance(50)
            // .charge(-200)
            // .on("tick", tick);

            // line displayed when dragging new nodes
            this.drag_line = this.vis.append("line")
                .attr("class", "drag_line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", 0);

            // get layout properties
            this.nodes = this.force.nodes();
            // this.links = this.force.links();
            this.node = this.vis.selectAll(".node");
            this.link = this.vis.selectAll(".link");
            this.text = this.vis.selectAll(".text");

            // add keyboard callback
            // d3.select(window).on("keydown", keydown);
        }
    }

    // rescale g
    private rescale(): void {
        const d3 = this.d3;
        const trans = d3.event.translate;
        const scale = d3.event.scale;

        this.vis.attr("transform", `translate(${trans}) scale(${scale})`);
    }

    private mousedown(): void {
        const d3 = this.d3;
        if (!this.mousedown_node && !this.mousedown_link) {
            // allow panning if nothing is selected
            this.vis.call(d3.zoom().on("zoom"), this.rescale);
            return;
        }
    }

    private mousemove(): void {
        if (!this.mousedown_node) return;

        // update drag line
        this.drag_line
            .attr("x1", this.mousedown_node.x)
            .attr("y1", this.mousedown_node.y)
        // .attr("x2", this.d3.axisLeft().mouse(this)[0])
        // .attr("y2", this.d3.svg.mouse(this)[1]);

    }

}
