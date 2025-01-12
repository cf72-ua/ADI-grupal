import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private firestore: Firestore) {}

  async getThemes(): Promise<any[]> {
    const themesCollection = collection(this.firestore, 'Themes');
    const snapshot = await getDocs(themesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getUsers(): Promise<any[]> {
    const usersCollection = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
