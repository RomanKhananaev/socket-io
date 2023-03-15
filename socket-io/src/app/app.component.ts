import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'socket-io';
  userId: number = 0;

  constructor(private wbService: WebSocketService) {
  }


  ngOnInit() {
    this.wbService.listen('receive-userInfo').subscribe(data => {
      console.log("User Info: ", data);
    });
    this.wbService.listen('error-userInfo').subscribe(data => {
      console.log("User Error: ", data);
    });
    this.wbService.listen('receive-time').subscribe((data:any) => {
      console.log("Now its: ", new Date(data));
    });
  }

  fetchData() {
    console.log("Data for id: ", this.userId);
    this.wbService.emit('fetch-data', this.userId);
  }

  getTime() {
    console.log("Data for id: ", this.userId);
    this.wbService.emit2('get-time');
  }
}
