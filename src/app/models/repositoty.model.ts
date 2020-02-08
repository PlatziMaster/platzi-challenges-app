export interface SearchResponse {
  repositoryCount: number;
  edges: EdgeRepository[];
}

export interface Filter {
  type: string;
  topic: string;
  language: string;
  level: string;
}

export interface EdgeRepository {
  node: Repository;
}

export interface EdgeTopic {
  nodes: Topic[];
}


export interface Repository {
  name: string;
  url: string;
  description: string;
  homepageUrl: string;
  totalCount: number;
  icon?: string;
  primaryLanguage: {
    name: string;
  };
  level?: {
    name: string;
    color: string;
  };
  repositoryTopics: EdgeTopic;
}

export interface Topic {
  id: string;
  topic: {
    name: string;
  };
}
