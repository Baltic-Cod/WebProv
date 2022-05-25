import { RelationshipBasics, RelationshipInformation } from './neon';
import {
  DependencyRelationship,
  InformationField,
  InformationRelationship,
  ProvenanceNode,
  Study,
  RelationshipRule,
  NodeDefinition,
} from './schemas';

export interface BackendSuccess {
  result: 'success';
}

export interface BackendError {
  result: 'error';
  message: string;
}

export interface BackendItems<T> {
  result: 'success';
  items: T[];
}

export interface BackendItem<T> {
  result: 'success';
  item: T;
}

export interface BackendRelationships<T> {
  result: 'success';
  items: Array<{ properties: T, source: string, target: string }>;
}

export interface BackendNotFound {
  result: 'not-found';
}

type SingleOrArray<S> = RelationshipInformation<S> | Array<RelationshipInformation<S>>;

export interface ProvenanceAPI {
  '/health': {
    //
  };

  '/database': {
    DELETE: {
      response: BackendSuccess | BackendNotFound | BackendError;
    },
  };

  '/information': {
    GET: {
      response: BackendError | BackendItems<InformationField>,
    }

    POST: {
      body: InformationField | InformationField[];
      response: BackendSuccess | BackendError;
    }

    DELETE: {
      query: { id: string }
      response: BackendSuccess | BackendNotFound | BackendError;
    },
  };

  '/information-relationships': {
    POST: {
      body: SingleOrArray<InformationRelationship>;
      response: BackendError | BackendSuccess,
    }
  }

  '/rules': {
    GET: {
      response: BackendError | BackendItems<RelationshipRule>,
    }
  }

  '/definitions': {
    GET: {
      response: BackendError | BackendItems<NodeDefinition>,
    }
  }

  '/nodes': {
    GET: {
      response: BackendError | BackendItems<ProvenanceNode>,
    }

    POST: {
      body: ProvenanceNode | ProvenanceNode[];
      response: BackendSuccess | BackendError;
    }

    DELETE: {
      query: { id: string }
      response: BackendSuccess | BackendNotFound | BackendError;
    },
  };

  '/studies/study-id/max': {
    GET: {
      response: BackendItem<number> | BackendError,
    },
  };

  '/studies': {
    GET: {
      response: BackendError | BackendItems<Study>,
    }

    POST: {
      body: Study | Study[];
      response: BackendSuccess | BackendError;
    }

    DELETE: {
      query: { id: string }
      response: BackendSuccess | BackendNotFound | BackendError;
    },
  };

  '/nodes/dependencies': {
    GET: {
      response: BackendRelationships<DependencyRelationship> | BackendError;
    },

    POST: {
      body: SingleOrArray<DependencyRelationship>;
      response: BackendSuccess | BackendError;
    }

    DELETE: {
      query: { id: string }
      response: BackendSuccess | BackendNotFound | BackendError;
    },
  };

  '/nodes/information': {
    GET: {
      response: BackendRelationships<InformationRelationship> | BackendError;
    },

    POST: {
      body: {
        relationship: RelationshipBasics<InformationRelationship>,
        information: InformationField,
      };
      response: BackendSuccess | BackendError;
    },
  };

  '/execute-query': {
    GET: {
      query: { query: string };
      response: BackendItems<unknown[]> | BackendError;
    }
  }
}
