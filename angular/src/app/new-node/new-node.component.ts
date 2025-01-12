import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})

export class NewNodeComponent implements OnInit {
  title: string = '';
  content: string = '';
  themeId: string | null = null; 
  createdById: string | null = null;
  themes: any[] = [];
  users: any[] = [];

  constructor(
    private firestore: Firestore,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadThemes();
    this.loadUsers();
  }

  async loadThemes(): Promise<void> {
    try {
      this.themes = await this.sharedService.getThemes();
    } catch (error) {
      console.error('Error loading themes:', error);
    }
  }

  async loadUsers(): Promise<void> {
    try {
      this.users = await this.sharedService.getUsers();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async createNode(): Promise<void> {
    if (!this.title || !this.content || !this.themeId || !this.createdById) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const themeRef = doc(this.firestore, 'Themes', this.themeId);
      const userRef = doc(this.firestore, 'users', this.createdById);

      await addDoc(collection(this.firestore, 'Nodes'), {
        title: this.title,
        content: this.content,
        themeId: themeRef, 
        createdBy: userRef,
        createdAt: new Date(),
      });

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error creating node:', error);
    }
  }

  navigateToNewNode(): void {
    this.router.navigate(['/nodes']);
  }
}