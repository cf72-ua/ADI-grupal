import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { NodesComponent } from './nodes/nodes.component';
import { NewNodeComponent } from './new-node/new-node.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'nodes', component: NodesComponent },
    { path: 'new-node', component: NewNodeComponent },
];
