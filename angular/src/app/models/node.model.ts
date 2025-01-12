import { DocumentReference } from '@angular/fire/firestore';

export interface Node {
  id: string;
  title?: string;
  content?: string;
  themeId?: DocumentReference;
  createdBy?: DocumentReference;
  createdAt?: any;
  theme?: string;
  createdByEmail?: string;
}
