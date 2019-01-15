export class Issueinfo {
    firstName: string;
    surName: string;
    issueCount: string;
    dob: Date;
    constructor(
      firstName: string,
      surName: string,
      issueCount: string,
      dob: Date) {
        this.firstName = firstName;
        this.surName = surName;
        this.issueCount = issueCount;
        this.dob = dob;
      }
  }
