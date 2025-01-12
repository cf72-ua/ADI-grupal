import { Component, OnInit } from '@angular/core';
import { NodesService } from '../services/nodes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Node } from '../models/node.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})

export class NodesComponent implements OnInit {
  nodes: Node[] = []; 
  errorMessage: string = ''; 
  isLoading: boolean = true;
  searchQuery: string = '';

  selectedNode: Node | null = null;
  isEditing: boolean = false;

  constructor(private nodesService: NodesService, private router: Router) {}

  ngOnInit(): void {
    this.loadNodes();
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

  startEditing(node: Node): void {
    this.selectedNode = { ...node };
    this.isEditing = true;
  }

  async saveNode(): Promise<void> {
    if (!this.selectedNode) return;

    try {
      await this.nodesService.updateNode(this.selectedNode.id, {
        title: this.selectedNode.title,
        content: this.selectedNode.content,
      });

      this.nodes = this.nodes.map((node) =>
        node.id === this.selectedNode?.id ? this.selectedNode : node
      );

      this.cancelEditing();
    } catch(error) {
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
}