import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private location: Location, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
