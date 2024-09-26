import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const user1 = new User({
    username: 'admin',
    password: '123',
    role: 'admin',
  });
  user1.generateToken();

  const user2 = new User({
    username: 'user',
    password: '123',
    role: 'user',
  });
  user2.generateToken();

  await user1.save();

  await user2.save();


  const [
      kurtCobain,
      ladyGaga,
      theWeeknd,
  ] = await Artist.create([
    {
      createUser: user1,
      name: 'Курт Кобейн',
      image: 'fixtures/kurt.jpg',
      information: 'Курт До́нальд Кобе́йн — американский рок-музыкант, вокалист, гитарист и автор песен. Наиболее известен как основатель и лидер рок-группы «Нирвана». В середине 1980-х годов Кобейн начал увлекаться панк-роком, а в 1987 году вместе с Кристом Новоселичем образовал группу «Нирвана».',
      isPublished: true,
    },
    {
      createUser: user2,
      name: 'Леди Гага',
      image: 'fixtures/gaga.jpg',
      information: 'Ле́ди Га́га — американская певица, автор песен, продюсер, филантроп и актриса. Имеет множество наград, среди которых шесть премий «Грэмми», 13 MTV Video Music Awards и 8 MTV Europe Music Awards, а также занимает четвёртое место в списке 100 величайших женщин в музыке по версии VH1.',
      isPublished: true,
    },
    {
      createUser: user2,
      name: 'The Weeknd',
      image: 'fixtures/The_Weeknd.png',
      information: 'Э́йбел Макко́нен Те́сфайе, также известный как The Weeknd — канадский певец, автор песен и актер. Известный своей звуковой универсальностью и мрачным лиризмом, его музыка исследует эскапизм, романтику и меланхолию и часто вдохновляется личным опытом.',
      isPublished: false,
    }
  ]);


  const [
    nirvanaNevermind,
    InUtero,
    judas,
    TheFameMonster,
    Starboy,
  ] = await Album.create([
    {
      createUser: user2,
      artist: kurtCobain,
      nameAlbum: 'Nirvana Nevermind',
      datetime: 1991,
      image: 'fixtures/NirvanaNevermindAlbum.jpg',
      isPublished: true,
    },
    {
      createUser: user1,
      artist: kurtCobain,
      nameAlbum: 'In Utero',
      datetime: 1993,
      image: 'fixtures/inUtero.jpg',
      isPublished: true,
    },
    {
      createUser: user1,
      artist: ladyGaga,
      nameAlbum: 'Judas',
      datetime: 2011,
      image: 'fixtures/judasAlbum.png',
      isPublished: true,
    },
    { createUser: user2,
      artist: ladyGaga,
      nameAlbum: 'The Fame Monster',
      datetime: 2009,
      image: 'fixtures/monster.jpg',
      isPublished: true,
    }, {
      createUser: user2,
      artist: theWeeknd,
      nameAlbum: 'Star boy',
      datetime: 2016,
      image: 'fixtures/starboy.jpg',
      isPublished: false,
    },
  ]);

  await Track.create([
    {
      album: nirvanaNevermind,
      artist: kurtCobain,
      nameTrack: 'Smells Like Teen Spirit',
      duration: '4:38',
      numberTrack: 1,
      isPublished: true,
      createUser: user1,
    },
    {
      album: nirvanaNevermind,
      artist: kurtCobain,
      nameTrack: 'Come As You Are',
      duration: '3:44',
      numberTrack: 2,
      isPublished: true,
      createUser: user1,
    },
    {
      album: nirvanaNevermind,
      artist: kurtCobain,
      nameTrack: 'Lithium',
      duration: '4:17',
      numberTrack: 3,
      isPublished: true,
      createUser: user1,
    },
    {
      album: nirvanaNevermind,
      artist: kurtCobain,
      nameTrack: 'Territorial pissings',
      duration: '2:23',
      numberTrack: 4,
      isPublished: true,
      createUser: user1,
    },
    {
      album: nirvanaNevermind,
      artist: kurtCobain,
      nameTrack: 'Lounge act',
      duration: '2:27',
      numberTrack: 5,
      isPublished: true,
      createUser: user1,
    },
    {
      album: InUtero,
      artist: kurtCobain,
      nameTrack: 'Scentless Apprentice',
      duration: '3:44',
      numberTrack: 1,
      isPublished: true,
      createUser: user1,
    },
    {
      album: InUtero,
      artist: kurtCobain,
      nameTrack: 'Rape me',
      duration: '2:50',
      numberTrack: 2,
      isPublished: true,
      createUser: user1,
    },
    {
      album: InUtero,
      artist: kurtCobain,
      nameTrack: 'Very Ape',
      duration: '1:56',
      numberTrack: 3,
      isPublished: true,
      createUser: user1,
    },
    {
      album: InUtero,
      artist: kurtCobain,
      nameTrack: 'Radio friendly unit shifter',
      duration: '4:51',
      numberTrack: 4,
      isPublished: true,
      createUser: user1,
    },
    {
      album: InUtero,
      artist: kurtCobain,
      nameTrack: 'scentless apprentice',
      duration: '3:48',
      numberTrack: 5,
      isPublished: true,
      createUser: user1,
    },
    {
      album: judas,
      artist: ladyGaga,
      nameTrack: 'Somewhere over the rainbow',
      duration: '5:34',
      numberTrack: 1,
      isPublished: true,
      createUser: user2,
    },
    {
      album: judas,
      artist: ladyGaga,
      nameTrack: 'La vie en rose',
      duration: '2:34',
      numberTrack: 2,
      isPublished: true,
      createUser: user2,
    },
    {
      album: judas,
      artist: ladyGaga,
      nameTrack: 'Maybe it’s time',
      duration: '3:34',
      numberTrack: 3,
      isPublished: true,
      createUser: user2,
    },
    {
      album: judas,
      artist: ladyGaga,
      nameTrack: 'Judas',
      duration: '4:34',
      numberTrack: 4,
      isPublished: true,
      createUser: user2,
    },
    {
      album: judas,
      artist: ladyGaga,
      nameTrack: 'Out of Time',
      duration: '5:34',
      numberTrack: 5,
      isPublished: true,
      createUser: user2,
    },
    {
      album: TheFameMonster,
      artist: ladyGaga,
      nameTrack: 'Monster',
      duration: '5:34',
      numberTrack: 1,
      isPublished: true,
      createUser: user2,
    },
    {
      album: TheFameMonster,
      artist: ladyGaga,
      nameTrack: 'Just Dance',
      duration: '4:02',
      numberTrack: 2,
      isPublished: true,
      createUser: user2,
    },
    {
      album: TheFameMonster,
      artist: ladyGaga,
      nameTrack: 'Paparazzi',
      duration: '3:34',
      numberTrack: 3,
      isPublished: true,
      createUser: user2,
    },
    {
      album: TheFameMonster,
      artist: ladyGaga,
      nameTrack: 'Eh, Eh',
      duration: '2:56',
      numberTrack: 4,
      isPublished: true,
      createUser: user2,
    },
    {
      album: TheFameMonster,
      artist: ladyGaga,
      nameTrack: 'The Fame',
      duration: '5:34',
      numberTrack: 5,
      isPublished: true,
      createUser: user2,
    },{
      album: Starboy,
      artist: theWeeknd,
      nameTrack: 'Starboy',
      duration: '3:50',
      numberTrack: 1,
      isPublished: false,
      createUser: user2,
    },{
      album: Starboy,
      artist: theWeeknd,
      nameTrack: 'False Alarm',
      duration: '3:40',
      numberTrack: 2,
      isPublished: false,
      createUser: user2,
    },{
      album: Starboy,
      artist: theWeeknd,
      nameTrack: 'Rockin',
      duration: '3:53',
      numberTrack: 3,
      isPublished: false,
      createUser: user2,
    }
  ]);


  await db.close();
};

run().catch(console.log);
