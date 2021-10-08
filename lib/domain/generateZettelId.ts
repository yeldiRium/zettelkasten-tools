const idLength = 8;
const idCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

type ZettelId = string;

const randomCharacter = function (): string {
  return idCharacters[Math.floor(Math.random() * idCharacters.length)];
};

const generateZettelId = function (): ZettelId {
  return Array.from({ length: idLength }).
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
