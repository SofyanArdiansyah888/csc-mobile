import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss'],
})
export class SkeletonListComponent implements OnInit {
  @Input() loading = true;
  @Input() repeats: number[] = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit() {
  }

}
