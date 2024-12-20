import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss'],
})
export class BaseContainerComponent implements OnInit {
  @Input() doRefreshHandler!: (event: any) => void;
  constructor() { }

  ngOnInit() {}

  doRefresh(event: any) {
    if (this.doRefreshHandler) {
      this.doRefreshHandler(event);
    }
  }
}
