export class MapLocation {
  description: string;
  latitude: number;
  longitude: number;
  zoom: number;

  /**
   *
   */
  constructor() {
    this.description = '';
    this.latitude = -1;
    this.longitude = -1;
    this.zoom = -1;
  }
}

export class LibraryMapSearch {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  zoom: number;

  /**
   *
   */
  constructor() {
    this.id = -1;
    this.name = '';
    this.description = '';
    this.latitude = -1;
    this.longitude = -1;
    this.zoom = -1;
  }
}
