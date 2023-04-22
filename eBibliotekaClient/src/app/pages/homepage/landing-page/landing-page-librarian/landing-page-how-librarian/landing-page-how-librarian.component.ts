import { Component, OnInit } from '@angular/core';
import { HowSectionStep } from '../../landing-page-user/landing-page-how-user/HowSectionStep';

@Component({
  selector: 'app-landing-page-how-librarian',
  templateUrl: './landing-page-how-librarian.component.html',
  styleUrls: [
    './landing-page-how-librarian.component.css',
    '../../landing-page-user/landing-page-how-user/landing-page-how-user.component.css',
  ],
})
export class LandingPageHowLibrarianComponent implements OnInit {
  currentStep: number = 1;

  steps: HowSectionStep[] = [
    new HowSectionStep(),
    {
      title: 'KREIRANJE PROFILA',
      content:
        'Klikom na dugme “REGISTRACIJA” u gornjem desnom ćošku se otvara prozor koji vas provodi kroz proces registracije. Sa podacima koje unosite u polja će te se kasnije prijavljivati. Podatke je moguće kasnije promijeniti ukoliko pogriješite.',
    },
    {
      title: 'UREĐIVANJE PROFILA',
      content:
        'Profil stvar koja treba privući korisnike da se učlane. Klikom na dugme UREDI na početnoj stranici imate mogućnost dodavanja detaljnog opisa, slike profila i baner slike. Ispod detaljnog opisa se nalazi dio za članstvo. Dodavanjem pounde za članstvo omogućujute učlanjivanje korisnicima. Dalje ispod se namješta lokacija biblioteke. Ukoliko dodate lokaciju korisnici mogu otkriti vašu biblioteku pretraživanjem preko karte. ',
    },
    {
      title: 'UPRAVLJANJE KNJIGAMA',
      content:
        'Za dodavanje knjiga potreno je prvo dodati autora, tom možete učiniti klikom na dugme "AUTORI" na naslovnoj stranici se otvara prozor za upravljanje autorima. Klikom na dugme "DODAJ KNJIGU" se otvara prozor za dodavanje knjige. Nakon unosa osnovnih informacija imate mogućnost detaljnog uređivanja knjige na stranici za detaljni pregled knjige, do koje dolazite preko pretraživanja na tabu "KNJIGE".',
    },
    {
      title: 'UPRAVLJANJE KORISNICIMA',
      content:
        'Na tabu korisnici možete pronaći listu svih korisnika koji su učlanjeni u vašu biblioteku. Klikom na korisnika se otvara prozor u kojem se nalaze informacije o korisniku, ponudu pomoću koje je ostvario članstvo, posuđene knjige i uplate.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  setStep(step: number) {
    this.currentStep = step;
  }
}
