import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    vertexRef: FirebaseListObservable<any>;
    edgeRef: FirebaseListObservable<any>;

    constructor(
        private db: AngularFireDatabase
    ) {
        this.vertexRef = db.list('/vertex');
        this.edgeRef = db.list('/edge');
    }

    ngOnInit(): void {

    }

    private removeEdgeIfVertexNotExist(edgeID: string, vertexId: string): void {
        this.db.list(`/vertex/${edgeID}`)
    }

    private removeEdgeIfNecessary(edgeID: string, edge: any): void {
        this.removeEdgeIfVertexNotExist(edgeID, edge.sourceId);
        this.removeEdgeIfVertexNotExist(edgeID, edge.targetId);
    }

}
