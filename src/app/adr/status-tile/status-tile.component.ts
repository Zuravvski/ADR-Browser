import { Component, OnInit, Input } from '@angular/core';
import { AdrStatus } from '../adr-status.model';

@Component({
  selector: 'app-status-tile',
  templateUrl: './status-tile.component.html',
  styleUrls: ['./status-tile.component.scss']
})
export class StatusTileComponent {
  @Input() active = true;
  @Input() small = false;
  @Input() status: AdrStatus;
}
