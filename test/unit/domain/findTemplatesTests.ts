import { assert } from 'assertthat';
import { findTemplates } from '../../../lib/domain/findTemplates';
import path from 'path';

suite('findTemplates', (): void => {
  test('finds all predefined templates.', async (): Promise<void> => {
    const availableTemplates = await findTemplates();

    assert.that(availableTemplates).is.equalTo([
      { name: 'empty', path: path.join(__dirname, '..', '..', '..', 'static', 'templates', 'empty.md.ejs') }
    ]);
  });
});
