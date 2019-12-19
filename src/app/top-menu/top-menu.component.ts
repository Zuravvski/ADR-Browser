import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdrService } from '../shared/adr.service';
import { Adr } from '../shared/adr.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  adrs: Adr[] = [];
  activeSubscriptions: Subscription[] = [];

  constructor(private adrService: AdrService) { }

  ngOnInit() {
    this.activeSubscriptions.push(
      this.adrService.browse().subscribe(adrs => {
        this.adrs = adrs;
  
        if(this.adrs.length > 0) {
          this.adrService.adrSelected.next(this.adrs[0]);
        }
      })
    );
  }

  onChange(event: string) {
    this.adrService.adrSelected.next(this.adrs.find(adr => adr.title === event));
  }
}
