import { DataSource } from "typeorm"
import { v4 as uuidv4 } from 'uuid';
import { Book, Media, Video } from "./entities/media";

async function InitializeDB(): Promise<DataSource> {

    const dataSource = new DataSource({
        useUnifiedTopology: true,
        type: "mongodb",
        host: process.env.MONGODB_HOST,
        port: Number(process.env.MONGODB_PORT),
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        database: process.env.MONGODB_DATABASE,
        entities: [Video, Book],
    })

    return await dataSource.initialize();
}

async function Insert(dataSource: DataSource, media: Media) {

    if (media instanceof Video)
        return await dataSource.getMongoRepository(Video).insertOne(media);
    if (media instanceof Book)
        return await dataSource.getMongoRepository(Book).insertOne(media);
}

async function main() {

    const video = new Video();
    video._id = uuidv4();
    video._type = "Video";
    video.director = 'Sidney Lumet';
    video.length = 96;
    video.title = '12 Angry Men';

    const book = new Book();
    book._id = uuidv4();
    book._type = "Book";
    book.author = 'Michael Crichton';
    book.pages = 350;
    book.title = 'The Andromeda Strain';

    console.info('-- Initializing database...');
    const dataSource = await InitializeDB();
    console.info('-- Inserting records...');
    const videoId = await Insert(dataSource, video);
    console.info('-- video record created with id=' + video._id);
    const bookId = await Insert(dataSource, book);
    console.info('-- book record created with id=' + book._id);
    console.info('-- End of program.');
    process.exit();
}

main();