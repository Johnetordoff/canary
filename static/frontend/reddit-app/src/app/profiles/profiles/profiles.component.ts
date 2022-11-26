import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@reddit/core/services/user/user.service';
import { CommentService } from '@reddit/core/services/comment/comment.service';
import { GroupService } from '@reddit/core/services/group/group.service';
import { User } from '@reddit/core/models/user.model';
import { Group } from '@reddit/core/models/group.model';
import { UserComment } from '@reddit/core/models/comment.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  user: User;
  page: number = 1;
  showLoader: boolean = false;
  next: string;
  userGroups: Group[] = [];
  modGroups: Group[] = [];
  userComments: UserComment[] = [];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthUser();
    // this.getUserGroups();
    // this.getModeratorGroups();
    this.getUserComments();
  }

  getAuthUser() {
    this.userService.userInitialized.subscribe(
      (initialized: boolean) => {
        if(initialized) {
          this.userService.user.subscribe(
            (response: User) => {
              this.user = response;
              console.log(this.user);
          })
        }
      })
  }

  getUserGroups(){
    this.groupService.getUserGroups('', this.user.id, 'ADMIN').subscribe(
      (response: any) => {
        this.userGroups = response;
      })
  }

  getUserComments(){
    this.commentService.userComments(this.user.username).subscribe(
      (response: any) => {
        this.userComments = response;
      })
  }

  getModeratorGroups(){
    this.groupService.filterMembers('MODERATOR', this.user.id).subscribe(
      (response: any) => {
        this.modGroups = response;
      })
  }
}
