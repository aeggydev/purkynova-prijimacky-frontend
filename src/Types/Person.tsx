export class Person {
    constructor(
        public id: string, // TODO: Maybe change to number
        public personalId: string,
        public applicantName: string,
        public applicantSurname: string,
        public parentName: string,
        public parentSurname: string,
        public parentEmail: string,
        public schoolName: string,
        public phone: string,
        public ip: string,
        public variableSymbol: string,
        public signInDate: Date, // TODO: Change to a date
        public payTillDate: Date, // TODO: Change to a date
        public paidDate: Date | null // TODO: Change to a date
    ) {}
}