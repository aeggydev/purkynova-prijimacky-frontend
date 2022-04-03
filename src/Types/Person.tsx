import { DateTime } from "luxon"

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
        public signInDate: string, // TODO: Change to a date
        public payTillDate: string, // TODO: Change to a date
        public paidDate: string | null // TODO: Change to a date
    ) {
    }
}

const luxonCzToDate = (str: string) => {
    const formatString = Array.from(str).indexOf(":") != -1
        ? "d'.' L'.' y"
        : "d'.' L'.' y T"
    const result = DateTime.fromFormat(str, "d'.' L'.' y").toJSDate()
    console.log(str)
    console.log(result)
    return result
}
// @ts-ignore
window["lolTest"] = DateTime

export const PeopleTest: Person[] = [
    {
        id: "001",
        ip: "130.52.200.110",
        applicantName: "Tomáš",
        applicantSurname: "Jordán",
        parentName: "Martina",
        parentSurname: "Kolečková",
        parentEmail: "koleckova.martina@centrum.cz",
        schoolName: "Základní škola Želešice, Sadová, příspěvková organizace",
        phone: "708851066",
        personalId: "001",
        variableSymbol: "2022001",
        signInDate: "2002-11-01T15:15:00.000+01:00",
        payTillDate: "2022-11-16T00:00:00.000+01:00",
        paidDate: "2022-11-03T00:00:00.000+01:00"
    },
    {
        id: "002",
        ip: "201.103.11.10",
        applicantName: "Monika",
        applicantSurname: "Hamerlová",
        parentName: "Jan",
        parentSurname: "Hamer",
        parentEmail: "hamerjan@gmail.com",
        variableSymbol: "2022002",
        phone: "777002110",
        schoolName: "Základní škola Želešice, Sadová, příspěvková organizace",
        personalId: "002",
        signInDate: "2022-11-12T01:20:00.000+01:00",
        payTillDate: "2022-11-27T00:00:00.000+01:00",
        paidDate: "2022-11-08T00:00:00.000+01:00"
    },
    {
        id: "003",
        personalId: "003",
        applicantName: "Jaroslav",
        applicantSurname: "Matlas",
        parentName: "Zuzana",
        parentSurname: "Matlasová",
        parentEmail: "matlasovaz@seznam.cz",
        ip: "66.101.5.19",
        variableSymbol: "2022003",
        schoolName: "Základní škola Želešice, Sadová, příspěvková organizace",
        phone: "609114303",
        signInDate: "2022-11-13T05:25:00.000+01:00",
        payTillDate: "2022-11-28T00:00:00.000+01:00",
        paidDate: "2022-11-15T00:00:00.000+01:00"
    }
    // TODO: Add more
]
