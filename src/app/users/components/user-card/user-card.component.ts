import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user.actions';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CreateEditDialogComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<User>();

  private matDialog = inject(MatDialog);
  private store = inject(Store);

  public dialogRef?: MatDialogRef<CreateEditDialogComponent>;

  constructor() {}

  onDeleteUser(user: User) {
    this.deleteUser.emit(user);
  }

  onEditUser(newUser: User) {
    this.dialogRef = this.matDialog.open(CreateEditDialogComponent, {
      data: { isEdit: true, user: newUser },
      width: '400px',
    });

    this.dialogRef?.afterClosed().subscribe((res) => {
      if (res) {
        const editUserData = {
          ...newUser,
          ...res,
        };
        this.store.dispatch(
          userActions.editUserSuccess({ user: editUserData })
        );
      }
    });
  }
}
