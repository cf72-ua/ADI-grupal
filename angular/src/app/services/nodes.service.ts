import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, getDoc, DocumentReference, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Node } from '../models/node.model'; 

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  constructor(private firestore: Firestore) {}

  async getNodes(): Promise<Node[]> {
    const nodesCollection = collection(this.firestore, 'Nodes');
    const snapshot = await getDocs(nodesCollection);

    const nodes: Node[] = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const node: Node = { id: docSnap.id, ...(docSnap.data() as any) };

        if (node.themeId instanceof DocumentReference) {
          const themeDoc = await getDoc(node.themeId);
          node.theme = themeDoc.exists() ? themeDoc.data()?.['title'] || 'Unknown Theme' : 'Unknown Theme';
        } else {
          node.theme = 'No Theme';
        }

        if (node.createdBy instanceof DocumentReference) {
          const userDoc = await getDoc(node.createdBy);
          node.createdByEmail = userDoc.exists() ? userDoc.data()?.['email'] || 'Unknown Email' : 'Unknown Email';
        } else {
          node.createdByEmail = 'Unknown Email';
        }

        if (node.createdAt && node.createdAt.seconds) {
          const date = new Date(node.createdAt.seconds * 1000);
          node.createdAt = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        }

        return node;
      })
    );

    return nodes;
  }

  async deleteNode(nodeId: string): Promise<void> {
    const nodeDoc = doc(this.firestore, 'Nodes', nodeId);
    await deleteDoc(nodeDoc);
  }

  async updateNode(nodeId: string, updatedData: Partial<any>): Promise<void> {
    const nodeDoc = doc(this.firestore, 'Nodes', nodeId);
    await updateDoc(nodeDoc, updatedData);
  }
}
