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
    image: 'fixtures/gaga.png',
    information: 'Ле́ди Га́га — американская певица, автор песен, продюсер, филантроп и актриса. Имеет множество наград, среди которых шесть премий «Грэмми», 13 MTV Video Music Awards и 8 MTV Europe Music Awards, а также занимает четвёртое место в списке 100 величайших женщин в музыке по версии VH1.'
  });

  const [
    nirvanaNevermind,
    judas
  ] = await Album.create({
    artist: kurtCobain,
    nameAlbum: 'Nirvana Nevermind',
    datetime: '24 сентября 1991',
    image: 'fixtures/NirvanaNevermindAlbum.jpg'
  }, {
    artist: ladyGaga,
    nameAlbum: 'Judas',
    datetime: '4 мая 2011',
    image: 'fixtures/judasAlbum.png'
  });

  await Track.create({
    album: nirvanaNevermind,
    nameTrack: 'Smells Like Teen Spirit',
    duration: '4:38'
  }, {
    album: judas,
    nameTrack: 'Judas',
    duration: '5:34'
  }, {
    album: nirvanaNevermind,
    nameTrack: 'Come As You Are',
    duration: '3:44'
  });

  await db.close();
};

run().catch(console.log);
