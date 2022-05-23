interface Admin {
    role?: string;
}
interface User extends Admin {
    name: string;
    age: number;
    occupation?: string;
}
export declare type Person = User;
export declare const persons: Person[];
export declare function logPerson(person: Person): void;
export {};
