import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SEARCH } from '@graphql/queries';
import { SearchResponse, Filter } from '@models/repositoty.model';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  search(filter: Partial<Filter>): Observable<SearchResponse> {
    let query = `org:PlatziMaster `;
    if (filter.topic && filter.topic !== 'all') {
      query += `topic:${filter.topic} `;
    }
    if (filter.language && filter.language !== 'all') {
      query += `language:${filter.language}`;
    }
    return this.http.post(this.apiUrl, {
      query: SEARCH,
      variables: { query }
    }, {
      headers: {
        Authorization: `Bearer 6e35cc730b2d605ed0cd3e3fa919058a810e8e6a`
      }
    })
    .pipe(
      map((response: any) => {
        const rta = response.data.search as SearchResponse;
        if (filter.type  && filter.type !== 'all') {
          rta.edges = rta.edges
          .filter(edge => edge.node.name.includes(filter.type));
        }
        return rta;
      })
    );

  }
}
