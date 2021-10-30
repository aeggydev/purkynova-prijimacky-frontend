export class Person {
    constructor(
        public id: string, // TODO: Maybe change to number
        public applicantName: string,
        public applicantSurname: string,
        public parentName: string,
        public parentSurname: string,
        public parentEmail: string,
        public schoolName: string,
        public phone: string,
        public ip: string,
        public variableSymbol: string,
        public signInDate: string, // TODO: Change to a date
        public payTillDate: string, // TODO: Change to a date
        public paidDate: string | null // TODO: Change to a date
    ) {}
}