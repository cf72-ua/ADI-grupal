import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Node } from '../models/node.model';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Firestore, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class NodesComponent implements OnInit {
  nodes: Node[] = [];
  themes: any[] = [];
  users: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  searchQuery: string = '';

  selectedNode: Node | null = null;
  isEditing: boolean = false;

  constructor(
    private firestore: Firestore,
    private nodesService: NodesService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNodes();
    this.loadThemes();
    this.loadUsers();
  }

  async loadNodes(): Promise<void> {
    try {
      this.isLoading = true;
      this.nodes = await this.nodesService.getNodes();
    } catch (error) {
      console.error('Error al cargar los nodos:', error);
      this.errorMessage = 'No se pudieron cargar los nodos. Intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  async loadThemes(): Promise<void> {
    try {
      this.themes = await this.sharedService.getThemes();
    } catch (error) {
      console.error('Error al cargar los temas:', error);
    }
  }

  async loadUsers(): Promise<void> {
    try {
      this.users = await this.sharedService.getUsers();
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }

  startEditing(node: Node): void {
    console.log('Editing node:', node);
    this.selectedNode = { ...node };
    this.isEditing = true;
  }

  async saveNode(): Promise<void> {
    if (!this.selectedNode) return;
  
    try {
      const themeRef = this.selectedNode.themeId
        ? doc(this.firestore, `Themes/${this.selectedNode.themeId}`)
        : null;
  
      const userRef = this.selectedNode.createdBy
        ? doc(this.firestore, `users/${this.selectedNode.createdBy}`)
        : null;
  
      await this.nodesService.updateNode(this.selectedNode.id, {
        title: this.selectedNode.title,
        content: this.selectedNode.content,
        themeId: themeRef,
        createdBy: userRef,
      });
  
      this.nodes = this.nodes.map((node) =>
        node.id === this.selectedNode?.id ? this.selectedNode : node
      );
  
      this.cancelEditing();

    } catch (error) {
      console.error('Error saving node: ', error);
    }
  }

  cancelEditing(): void {
    this.selectedNode = null;
    this.isEditing = false;
  }

  navigateToNewNode(): void {
    this.router.navigate(['/new-node']);
  }

  async deleteNode(nodeId: string): Promise<void> {
    if (confirm('Are you sure you want to delete this node?')) {
      try {
        await this.nodesService.deleteNode(nodeId);
        this.nodes = this.nodes.filter((node) => node.id !== nodeId);
      } catch (error) {
        console.error('Error deleting node: ', error);
      }
    }
  }
}