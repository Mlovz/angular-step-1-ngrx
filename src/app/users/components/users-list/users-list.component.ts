import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user.actions';
import { selectUserError, selectUsers } from '../../state/user.selectors';
import { selectGlobalLoading } from '../../../store/global.reducer';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    UserCardComponent,
    MatButtonModule,
    CreateEditDialogComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private store = inject(Store);

  private matDialog = inject(MatDialog);
  public dialogRef!: MatDialogRef<CreateEditDialogComponent>;

  public users$ = this.store.select(selectUsers);
  public userError$ = this.store.select(selectUserError);
  public isLoading$ = this.store.select(selectGlobalLoading);

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(userActions.loadUsers());
  }

  onDelete(deleteUser: User) {
    this.store.dispatch(userActions.deleteUserSuccess({ user: deleteUser }));
  }

  onOpenDialog() {
    this.dialogRef = this.matDialog.open(CreateEditDialogComponent, {
      data: { isEdit: false },
      width: '400px',
    });

    this.dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        const newUser = {
          id: Math.random(),
          ...user,
        };
        this.store.dispatch(userActions.createUserSuccess({ user: newUser }));
      }
    });
  }
}
