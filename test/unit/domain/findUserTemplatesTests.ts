import { assert } from 'assertthat';
import { findUserTemplates } from '../../../lib/domain/findUserTemplates';
import path from 'path';

suite('findUserTemplates', (): void => {
  test('finds user defined templates.', async (): Promise<void> => {
    const zettelkastenDirectory = path.join(__dirname, '..', '..', 'shared');

    const availableTemplates = await findUserTemplates({ zettelkastenDirectory });

    assert.that(availableTemplates).is.equalTo([
      { name: 'another', path: path.join(zettelkastenDirectory, 'templates', 'another.md.ejs') },
      { name: 'test', path: path.join(zettelkastenDirectory, 'templates', 'test.md.ejs') }
    ]);
  });
});
