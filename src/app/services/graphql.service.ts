import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SEARCH } from '@graphql/queries';
import { SearchResponse, Filter, EdgeRepository } from '@models/repositoty.model';
import { AuthService } from '@services/auth.service';

const ICONS = {
  Python: 'logo-python',
  HTML: 'logo-html5',
  JavaScript: 'logo-javascript',
};

const LEVELS = {
  'level-basic': {
    name: 'basic',
    color: 'success'
  },
  'level-medium': {
    name: 'medium',
    color: 'warning'
  },
  'level-high': {
    name: 'high',
    color: 'danger'
  },
};


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  search(filter: Partial<Filter>): Observable<SearchResponse> {
    const token = this.authService.getToken();
    return this.http.post(this.apiUrl, {
      query: SEARCH,
      variables: {
        query: this.makeQuery(filter)
      }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .pipe(
      map((response: any) => {
        const rta = response.data.search as SearchResponse;
        if (filter.type  && filter.type !== 'all') {
          rta.edges = this.filterByType(rta.edges, filter.type);
        }
        if (filter.level && filter.level !== 'all') {
          rta.edges = this.filterByLevel(rta.edges, filter.level);
        }
        rta.edges = this.addAttrsInRepository(rta.edges);
        return rta;
      })
    );

  }

  private makeQuery(filter: Partial<Filter>) {
    let query = `org:PlatziMaster `;
    if (filter.topic && filter.topic !== 'all') {
      query += `topic:${filter.topic} `;
    }
    if (filter.language && filter.language !== 'all') {
      query += `language:${filter.language}`;
    }
    return query;
   }

  /*
    ['challenge-1', challenge-3', 'project-1', 'class-1']
    .filter(item => item.includes('challenge'))
    ['challenge-1', challenge-3']
  */
  private filterByType(edges: EdgeRepository[], type: string) {
   return edges
   .filter(edge => edge.node.name.includes(type));
  }

  /*
    ['level-basic', level-basic', 'level-medium', 'level-hight']
    .filter(item => item.includes('level-basic'))
    ['level-basic', level-basic']
  */
 private filterByLevel(edges: EdgeRepository[], level: string) {
  return edges
  .filter(edge =>  {
    const topics = edge.node.repositoryTopics.nodes.map(item => item.topic.name);
    return topics.includes(`level-${level}`);
  });
 }

 /*
    {
      ...attrs,
      level: {
        name: 'basic',
        color: 'success'
      },
      icon: 'logo-python'
    }
  */
 private addAttrsInRepository(edges: EdgeRepository[]) {
  return edges
  .map(edge => {
    const topics = edge.node.repositoryTopics.nodes.map(item => item.topic.name);
    const topic = topics
    .find(item => item === 'level-basic' || item === 'level-medium' || item === 'level-high');
    if (topic && LEVELS[topic]) {
      edge.node.level = LEVELS[topic];
    }
    const language = edge.node.primaryLanguage.name;
    if (topic) {
      edge.node.icon = ICONS[language] || 'information-circle';
    }
    return edge;
  });
 }
}
