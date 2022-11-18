import { Column, Entity, ObjectIdColumn } from "typeorm";


export abstract class Media {
    @ObjectIdColumn()
    _id: string;
    @Column()
    _type: string;
    @Column()
    title: string;
}

@Entity("media")
export class Video extends Media {
    @Column()
    director: string;
    @Column()
    length: number;
}

@Entity("media")
export class Book extends Media {
    @Column()
    author: string;
    @Column()
    pages: number;
}