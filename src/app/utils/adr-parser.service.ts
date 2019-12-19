import { Injectable } from '@angular/core';
import { AdrStatus } from '../adr/adr-status.model';
import { Adr } from '../shared/adr.model';

@Injectable({ providedIn: 'root' })
export class AdrParser {
    private readonly knownAdrStatuses: AdrStatus[] = [
        new AdrStatus('Proposed', 'assets/circle-question.svg', 'proposed'),
        new AdrStatus('Accepted', 'assets/circle-check.svg', 'accepted'),
        new AdrStatus('Superseded', 'assets/circle-remove.svg', 'warning'),
        new AdrStatus('Deprecated', 'assets/circle-remove.svg', 'warning'),
        new AdrStatus('Rejected', 'assets/circle-remove.svg', 'rejected'),
    ];

    parse(markdown: string): Adr {
        return new Adr(
            this.parseTitle(markdown),
            this.parseDate(markdown),
            this.parseContent(markdown),
            this.parseStatus(markdown)
        );
    }

    getKnownAdrStatuses(): AdrStatus[] {
        return this.knownAdrStatuses.slice();
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
        const statusName = markdown.substring(markdown.indexOf('## Status'), markdown.indexOf('## Context'))
                                   .split(/\s/)
                                   .filter(s => s)[2];

        return this.knownAdrStatuses.find(status => status.name === statusName);
    }
}