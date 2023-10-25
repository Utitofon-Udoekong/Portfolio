export interface Project {
    id:        string;
    title:     string;
    slug:      string;
    type:      string;
    cover:     string;
    client:    string;
    address:   string;
    completed: number;
    stack:     Stack[];
    role:      string;
    lead:      string;
    images:    string[];
}

export interface Images {
    web: Mob[];
    mob: Mob[];
}

export interface Mob {
    name: string;
}

export interface Stack {
    name:  string;
    color: string;
}

const FILENAME_RE = /(^|[/\\])([^/\\]+?)(?=(\.[^.]+)?$)/;
export function filename(path: string) {
  return path.match(FILENAME_RE)?.[0];
}