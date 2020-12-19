import { assert } from 'assertthat';
import { getApplicationRoot } from '../../../lib/utils/getApplicationRoot';
import path from 'path';
import { unpackOrCrash } from '@yeldirium/result';

suite('getApplicationRoot', (): void => {
  test(`returns this module's base directory.`, async (): Promise<void> => {
    const directory = unpackOrCrash(await getApplicationRoot({ directory: __dirname }));

    assert.that(directory).is.equalTo(path.join(__dirname, '..', '..', '..'));
  });
});
