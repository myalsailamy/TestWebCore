import { PreventUnsavedChangesGuard } from './../guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './../resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './../resolvers/member-list.resolver';
import { MemberDetailResolver } from './../resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './../guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard], children: [
            {
                path: 'members', component: MemberListComponent, resolve: {
                    users: MemberListResolver
                }
            },
            {
                path: 'member/edit', component: MemberEditComponent, resolve: {
                    user: MemberEditResolver
                }, canDeactivate: [PreventUnsavedChangesGuard]
            },
            {
                path: 'members/:id', component: MemberDetailComponent, resolve: {
                    user: MemberDetailResolver
                }
            },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
    // { path: '', component: HomeComponent },
    // { path: '', component: HomeComponent }
];
