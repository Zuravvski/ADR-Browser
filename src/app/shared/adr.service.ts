import { Injectable, Output } from '@angular/core';
import { Adr } from './adr.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators'
import { forkJoin, Observable, Subject } from 'rxjs';
import { AdrParser } from '../utils/adr-parser.service';

@Injectable({ providedIn: 'root' })
export class AdrService {
    adrSelected: Subject<Adr> = new Subject<Adr>();

    constructor(private httpClient: HttpClient, private adrParser: AdrParser) {}

    browse() : Observable<Adr[]> {
        return this.httpClient
            .get('https://api.github.com/repositories/51087740/contents/doc/adr')
            .pipe(
                mergeMap((adrsData: any) => forkJoin(adrsData.map(data => this.httpClient.get(data.url)))),
                map((adrs: any) => adrs.map(data => this.adrParser.parse(atob(data.content))))
            );
    }
}