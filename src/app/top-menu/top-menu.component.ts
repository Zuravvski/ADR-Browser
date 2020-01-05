import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdrService } from '../shared/adr.service';
import { Adr } from '../shared/adr.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  selectionForm: FormGroup;
  adrs: Adr[] = [];

  activeSubscriptions: Subscription[] = [];

  constructor(private adrService: AdrService, 
              private router: Router) { }

  ngOnInit() {
    this.selectionForm = new FormGroup({
      adrSelection: new FormControl()
    });

    this.adrService.browse().subscribe(adrs => {
      this.adrs = adrs
    });

    this.activeSubscriptions.push(
      this.adrService.selectedAdr.subscribe(adr => {
          this.selectionForm.controls['adrSelection'].setValue(adr);
      })
    );
  }

  onChange() {
    const selectedAdr = this.selectionForm.controls['adrSelection'].value;
    
    if(selectedAdr) {
      this.router.navigate([this.adrs.findIndex(adr => adr.title === selectedAdr.title)]);
    } else {
        this.router.navigate(['/']);
    }
  }

  compareAdrs(adr: any, otherAdr: any): boolean {
    return adr && otherAdr ? adr.title === otherAdr.title : adr === otherAdr; 
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
