import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shared: SharedService;
  
  constructor() { 
    this.shared = SharedService.getInstance();
    this.shared.user = new User('','','','');
  }

  ngOnInit() {
  }

  signOut(): void{
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/login';
    window.location.reload();
  }
}
