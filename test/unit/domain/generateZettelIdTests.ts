import { assert } from 'assertthat';
import { generateZettelId, idCharacters, idLength } from '../../../lib/domain/generateZettelId';

suite('generateZettelId', (): void => {
  test('generates an id with the right length and only valid characters.', async (): Promise<void> => {
    const newId = generateZettelId();

    assert.that(newId.length).is.equalTo(idLength);

    for (const character of newId.split('')) {
      assert.that(idCharacters).is.containing(character);
    }
  });
});
