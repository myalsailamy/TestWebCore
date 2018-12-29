import { AuthGuard } from './../guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
            { path: 'members', component: MemberListComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
    // { path: '', component: HomeComponent },
    // { path: '', component: HomeComponent }
];
