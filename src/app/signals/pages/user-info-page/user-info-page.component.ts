import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServicesService } from '../../services/users-services.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  public userRequestService = inject(UsersServicesService);
  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal(true);
  public fullname = computed<string>( () => {
    if(!this.currentUser()) return "Usuario no encontrado"
    return `${this.currentUser()?.first_name}  ${this.currentUser()?.last_name}`;
  })

  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id: number) {
    if(id <= 0) return;
    this.currentUser.set(undefined);
    this.userId.set(id);
    this.userRequestService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.set(user)
      },
      error: (resp) => {
        console.log("brodercito", resp);
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    })
  }
}
