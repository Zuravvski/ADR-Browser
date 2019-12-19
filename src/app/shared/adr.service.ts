import { Injectable, Output } from '@angular/core';
import { Adr } from './adr.model';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators'
import { forkJoin, Observable, Subject } from 'rxjs';
import { AdrStatus } from '../adr/adr-status.model';

@Injectable({ providedIn: 'root' })
export class AdrService {
    private readonly knownAdrStatuses: AdrStatus[] = [
        new AdrStatus('Proposed', 'assets/circle-question.svg', 'proposed'),
        new AdrStatus('Accepted', 'assets/circle-check.svg', 'accepted'),
        new AdrStatus('Superseded', 'assets/circle-remove.svg', 'warning'),
        new AdrStatus('Deprecated', 'assets/circle-remove.svg', 'warning'),
        new AdrStatus('Rejected', 'assets/circle-remove.svg', 'rejected'),
    ];

    adrSelected: Subject<Adr> = new Subject<Adr>();

    constructor(private httpClient: HttpClient) {}

    getKnownAdrStatuses(): AdrStatus[] {
        return this.knownAdrStatuses.slice();
    }

    browse() : Observable<Adr[]> {
        return this.httpClient
            .get('https://api.github.com/repositories/51087740/contents/doc/adr')
            .pipe(
                mergeMap((adrsData: any) => forkJoin(adrsData.map(data => this.httpClient.get(data.url)))),
                map((adrs: any) => adrs.map(data => {
                    const markdown = atob(data.content);

                    const title = this.parseTitle(markdown);
                    const date = this.parseDate(markdown);
                    const content = this.parseContent(markdown);
                    const status = this.parseStatus(markdown);
                    return new Adr(title, date, content, status);
                    })
                )
            );
    }

    private parseTitle(markdown: string) : string {
        return markdown.match(/#{1} (.*)/)[1];
    }

    private parseDate(markdown: string) : Date {
        return new Date(markdown.match(/Date: ([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)[1]);
    }

    private parseContent(markdown: string) : string {
        return markdown.slice(markdown.indexOf('Date:'));
    }

    private parseStatus(markdown: string) : AdrStatus {
        const status = markdown.substring(markdown.indexOf('## Status'), markdown.indexOf('## Context'))
                               .split(/\s/)
                               .filter(s => s)[2];

        return this.knownAdrStatuses.find(s => s.name === status);
    }
}