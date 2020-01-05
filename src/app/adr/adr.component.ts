import { Component, OnInit } from '@angular/core';
import { AdrStatus } from './adr-status.model';
import { Adr } from '../shared/adr.model';
import { AdrService } from '../shared/adr.service';
import { ActivatedRoute } from '@angular/router';
import { AdrParser } from '../utils/adr-parser.service';

class ActiveStatus {
  constructor(public value: AdrStatus, public active: boolean) { }
}

@Component({
  selector: 'app-adr',
  templateUrl: './adr.component.html',
  styleUrls: ['./adr.component.scss']
})
export class AdrComponent implements OnInit {
  statuses: ActiveStatus[] = [];
  adr: Adr;

  constructor(private adrService: AdrService, 
              private adrParser: AdrParser,          
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.statuses = this.adrParser.getKnownAdrStatuses().map((status: AdrStatus) => new ActiveStatus(status, false));

    this.route.params.subscribe(params => {
      this.adrService.browse().subscribe(adrs => {
        this.adr = adrs[+params.id];

        const statusIndex = this.statuses.findIndex(x => x.value.name === this.adr.status.name);

        if(statusIndex !== -1) {
          this.statuses.forEach(x => x.active = false);
          this.statuses[statusIndex].active = true;
        }

        this.adrService.selectedAdr.next(this.adr);
      });
    });
  }
}
