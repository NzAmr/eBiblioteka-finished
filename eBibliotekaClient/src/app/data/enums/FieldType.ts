export enum FieldType {
  Email,
  Username,
  Password,
  FirstName,
  LastName,
  LibraryName,
  Hour,
  Minutes,
}

export interface ValidationFunc {
  (input: string): string[];
}
