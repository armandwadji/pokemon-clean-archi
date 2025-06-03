export class CredentialModel {
  private name: string;
  private password: string;

  /**
   * Constructor for the CredentialModel class.
   * Initializes the name and password properties to empty strings.
   */
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  setName(name: string): void {
    this.name = name;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  isValid(name: string, password: string): boolean {
    return this.name === name && this.password === password;
  }
}
