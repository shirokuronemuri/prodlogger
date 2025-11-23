export interface User {
  username: string;
  id: string;
  createdAt: Date;
}

export interface Project {
  name: string;
  description: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  belongsToId: string;
}

export interface Update {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  body: string;
  version: string;
  updatePoints: UpdatePoint[];
}

export interface UpdatePoint {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  contents: string;
  type: 'FEATURE' | 'IMPROVEMENT' | 'BUGFIX';
}
