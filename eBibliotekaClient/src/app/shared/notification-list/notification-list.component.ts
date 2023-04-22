import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryService } from 'src/app/core/http/library.service';
import { NotificationListItemVM } from 'src/app/data/interfaces/Notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
 //notifications: NotificationListItemVM[] = [];
 @Output() onActionComplete: EventEmitter<any> = new EventEmitter();
  constructor(private libraryService : LibraryService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(){
    this.libraryService.getNotificationsForUser().subscribe((res)=>{
      this.notifications = res;
      console.log(this.notifications);
    })
  }
  closeOverlay(){
    this.onActionComplete.emit();
  }
  removeNotification(id:number){
    this.libraryService.removeNotification(id).subscribe((res)=>{
      this.loadNotifications();
    })
  }
}
