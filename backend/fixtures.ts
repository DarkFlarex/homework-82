import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [
    kurtCobain,
    ladyGaga
  ] = await Artist.create({
    name: 'Курт Кобейн',
    image: 'fixtures/kurt.jpg',
    information: 'Курт До́нальд Кобе́йн — американский рок-музыкант, вокалист, гитарист и автор песен. Наиболее известен как основатель и лидер рок-группы «Нирвана». В середине 1980-х годов Кобейн начал увлекаться панк-роком, а в 1987 году вместе с Кристом Новоселичем образовал группу «Нирвана».'
  }, {
    name: 'Леди Гага',
    image: 'fixtures/gaga.jpg',
    information: 'Ле́ди Га́га — американская певица, автор песен, продюсер, филантроп и актриса. Имеет множество наград, среди которых шесть премий «Грэмми», 13 MTV Video Music Awards и 8 MTV Europe Music Awards, а также занимает четвёртое место в списке 100 величайших женщин в музыке по версии VH1.'
  });

  const [
    nirvanaNevermind,
    InUtero,
    judas,
    TheFameMonster
  ] = await Album.create({
    artist: kurtCobain,
    nameAlbum: 'Nirvana Nevermind',
    datetime: 1991,
    image: 'fixtures/NirvanaNevermindAlbum.jpg'
  }, {
    artist: kurtCobain,
    nameAlbum: 'In Utero',
    datetime: 1993,
    image: 'fixtures/inUtero.jpg'
  }, {
    artist: ladyGaga,
    nameAlbum: 'Judas',
    datetime: 2011,
    image: 'fixtures/judasAlbum.png'
  }, {
    artist: ladyGaga,
    nameAlbum: 'The Fame Monster',
    datetime: 2009,
    image: 'fixtures/monster.png'
  });

  await Track.create({
    album: nirvanaNevermind,
    nameTrack: 'Smells Like Teen Spirit',
    duration: '4:38',
    numberTrack: 1,
  },{
    album: nirvanaNevermind,
    nameTrack: 'Come As You Are',
    duration: '3:44',
    numberTrack: 2,
  },{
    album: nirvanaNevermind,
    nameTrack: 'Come As You Are3',
    duration: '3:44',
    numberTrack: 3,
  },{
    album: nirvanaNevermind,
    nameTrack: 'Come As You Are4',
    duration: '3:44',
    numberTrack: 4,
  },{
    album: nirvanaNevermind,
    nameTrack: 'Come As You Are5',
    duration: '3:44',
    numberTrack: 5,
  },{
    album: InUtero,
    nameTrack: 'Scentless Apprentice1',
    duration: '3:44',
    numberTrack: 1,
  },{
    album: InUtero,
    nameTrack: 'Scentless Apprentice2',
    duration: '3:44',
    numberTrack: 2,
  },{
    album: InUtero,
    nameTrack: 'Scentless Apprentice3',
    duration: '3:44',
    numberTrack: 3,
  },{
    album: InUtero,
    nameTrack: 'Scentless Apprentice4',
    duration: '3:44',
    numberTrack: 4,
  },{
    album: InUtero,
    nameTrack: 'Scentless Apprentice5',
    duration: '3:44',
    numberTrack: 5,
  },{
    album: judas,
    nameTrack: 'Judas1',
    duration: '5:34',
    numberTrack: 1,
  },{
    album: judas,
    nameTrack: 'Judas2',
    duration: '5:34',
    numberTrack: 2,
  },{
    album: judas,
    nameTrack: 'Judas3',
    duration: '5:34',
    numberTrack: 3,
  },{
    album: judas,
    nameTrack: 'Judas4',
    duration: '5:34',
    numberTrack: 4,
  },
  {
    album: judas,
    nameTrack: 'Judas5',
    duration: '5:34',
    numberTrack: 5,
  },{
    album: TheFameMonster,
    nameTrack: 'TheFameMonster1',
    duration: '5:34',
    numberTrack: 1,
  },{
    album: TheFameMonster,
    nameTrack: 'TheFameMonster2',
    duration: '5:34',
    numberTrack: 2,
  },
  {
    album: TheFameMonster,
    nameTrack: 'TheFameMonster3',
    duration: '5:34',
    numberTrack: 3,
  },{
    album: TheFameMonster,
    nameTrack: 'TheFameMonster4',
    duration: '5:34',
    numberTrack: 4,
  },{
    album: TheFameMonster,
    nameTrack: 'TheFameMonster5',
    duration: '5:34',
    numberTrack: 5,
  },
  );

  await db.close();
};

run().catch(console.log);
