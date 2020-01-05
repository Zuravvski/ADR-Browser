import { Injectable } from '@angular/core';
import { Adr } from './adr.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, tap } from 'rxjs/operators'
import { forkJoin, Observable, of, BehaviorSubject } from 'rxjs';
import { AdrParser } from '../utils/adr-parser.service';

@Injectable({ providedIn: 'root' })
export class AdrService {
    private cachedAdrs: Adr[];
    
    selectedAdr: BehaviorSubject<Adr> = new BehaviorSubject<Adr>(null);

    constructor(private httpClient: HttpClient, private adrParser: AdrParser) {}

    browse() : Observable<Adr[]> {
        return this.areThereCachedAdrs() 
            ? of(this.cachedAdrs)
            : this.httpClient
                .get('https://api.github.com/repositories/51087740/contents/doc/adr')
                .pipe(
                    mergeMap((adrsData: any) => forkJoin(adrsData.map(data => this.httpClient.get(data.url)))),
                    map((adrs: any) => adrs.map(data => this.adrParser.parse(atob(data.content)))),
                    tap((adrs: Adr[]) => this.cachedAdrs = adrs)
                );
    }

    private areThereCachedAdrs(): boolean {
        return this.cachedAdrs != null && this.cachedAdrs.length > 0;
    }
}