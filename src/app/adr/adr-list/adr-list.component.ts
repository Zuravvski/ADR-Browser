import { Component, OnInit } from '@angular/core';
import { AdrService } from 'src/app/shared/adr.service';
import { Adr } from 'src/app/shared/adr.model';

@Component({
  selector: 'app-adr-list',
  templateUrl: './adr-list.component.html',
  styleUrls: ['./adr-list.component.scss']
})
export class AdrListComponent implements OnInit {

  adrs: Adr[] = [];

  constructor(private adrService: AdrService) { }

  ngOnInit() {
    this.adrService.browse().subscribe(adrs => this.adrs = adrs);
  }

}
