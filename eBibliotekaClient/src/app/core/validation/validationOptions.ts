import { FieldType, ValidationFunc } from '../../data/enums/FieldType';

/*
FieldType
----
    0 - Email
    1 - Username
    2 - Password
    3 - FirstName
    4 - LastName
    5 - LibraryName
----
*/

export const validationOptions: Record<FieldType, ValidationFunc> = {
  0: (field): string[] => {
    let messages: string[] = [];

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field)) {
      messages.push('E-mail adresa nije validna!');
    }

    return messages;
  },

  1: (field): string[] => {
    let messages: string[] = [];

    if (field.length < 3) {
      messages.push('Korisničko ime mora sadržavati najmanje tri slova!');
    }

    return messages;
  },

  2: (field): string[] => {
    let messages: string[] = [];

    if (field.length < 5) {
      messages.push('Lozinka mora biti duga najmanje tri karaktera!');
    }
    if (field.search(/[A-Z]/g) == -1) {
      messages.push('Lozinka mora sadržavati najmanje jedno veliko slovo!');
    }
    if (field.search(/[0-9]/g) == -1) {
      messages.push('Lozinka mora sadržavati najmanje jedan broj!');
    }

    return messages;
  },

  3: (field): string[] => {
    // Nije potrebna validacija za ime
    return [];
  },

  4: (field): string[] => {
    // Nije potrebna validacija za prezime
    return [];
  },

  5: (field): string[] => {
    let messages: string[] = [];

    if (field.length < 3) {
      messages.push('Naziv biblioteke mora sadržavati najmanje tri karaktera!');
    }

    return messages;
  },
  6: (field): string[] => {
    let messages: string[] = [];

    if (!field) {
      return ['Polje ne smije biti prazno'];
    }

    let hour = parseInt(field);

    if (hour < 0 || hour > 24) {
      messages.push('Sati moraju biti u rangu od 0 do 24!');
    }

    return messages;
  },
  7: (field): string[] => {
    let messages: string[] = [];

    if (!field) {
      return ['Polje ne smije biti prazno'];
    }

    let minutes = parseInt(field);

    if (minutes < 0 || minutes > 60) {
      messages.push('Minute moraju biti u rangu od 0 do 60!');
    }

    return messages;
  },
};
