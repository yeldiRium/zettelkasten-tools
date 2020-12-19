const idLength = 8;
const idCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

type ZettelId = string;

const randomCharacter = function (): string {
  return idCharacters[Math.floor(Math.random() * idCharacters.length)];
};

const generateZettelId = function (): ZettelId {
  return new Array(idLength).
    fill('').
    map((): string => randomCharacter()).
    join('');
};

export type {
  ZettelId
};
export {
  idLength,
  idCharacters,
  generateZettelId
};
