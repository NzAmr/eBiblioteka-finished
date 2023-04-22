import { Component, OnInit } from '@angular/core';
import { HowSectionStep } from './HowSectionStep';

@Component({
  selector: 'app-landing-page-how-user',
  templateUrl: './landing-page-how-user.component.html',
  styleUrls: ['./landing-page-how-user.component.css'],
})
export class LandingPageHowUserComponent implements OnInit {
  currentStep: number = 1;

  steps: HowSectionStep[] = [
    new HowSectionStep(),
    {
      title: 'KREIRANJE PROFILA',
      content:
        'Klikom na dugme “REGISTRACIJA” u gornjem desnom ćošku se otvara prozor koji vas provodi kroz proces registracije. Sa podacima koje unosite u polja će te se kasnije prijavljivati. Podatke je moguće kasnije promijeniti ukoliko pogriješite.',
    },
    {
      title: 'PRETRAŽIVANJE BIBLIOTEKA',
      content:
        'Pretraživanje biblioteka se vrši na tabu "BIBLIOTEKE", pretraživanje se može vršiti preko liste uz mogućnost filtriranja po imenu biblioteke i pomoću karte gdje možete biblioteke pretraživati po lokaciji.',
    },
    {
      title: 'UČLANJIVANJE U BIBLIOTEKE',
      content:
        'Klikom na biblioteku pri pretraživanju otvara stranicu profila biblioteke. Na stranici se, pored detaljnijih informacija o biblioteci, ponude za članstvo u biblioteci. Od ponude koju izaberete zavisi trajanje članarine i broj knjiga koje posuditi u isto vrijeme. Klikom na ponudu se otvara tab za plaćanje, i nakon uspješne uplate postajete član biblioteke.',
    },
    {
      title: 'POSUĐIVANJE KNJIGA',
      content:
        'Nakon učlanjivanja dobijate mogućnost posuđivanja knjiga. Pronađite željenu knjigu klikom na dugme "KNJIGE" na profilu biblioteke. nakon odabira željene knjige, klikom na dugme "POSUDI" se otvara prozor za posuđivanje knjige. Dan do kojeg planirate vratiti knjigu birate klikom na dan na kalendaru ili unosom u polje. Klikom na dugme "POSUDI" finalizirate vaš zahtjev i ukoliko se odobri možete podignuti knjigu.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  setStep(step: number) {
    this.currentStep = step;
  }
}
