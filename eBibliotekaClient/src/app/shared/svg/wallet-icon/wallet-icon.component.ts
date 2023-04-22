import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-icon',
  templateUrl: './wallet-icon.component.html',
  styleUrls: ['./wallet-icon.component.css'],
})
export class WalletIconComponent implements OnInit {
  @Input() svgClass: string;

  constructor() {
    this.svgClass = '';
  }

  ngOnInit(): void {}
}
