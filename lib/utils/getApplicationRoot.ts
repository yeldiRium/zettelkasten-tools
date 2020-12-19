import fs from 'fs';
import path from 'path';
import { DirectoryNotFound, PackageJsonNotFound } from '../errors';
import { fail, okay, Result } from '@yeldirium/result';

const getApplicationRoot = async function ({ directory }: {
  directory: string;
}): Promise<Result<string, DirectoryNotFound | PackageJsonNotFound>> {
  try {
    await fs.promises.access(directory, fs.constants.R_OK);
  } catch (ex: unknown) {
    if ((ex as NodeJS.ErrnoException).code === 'ENOENT') {
      return fail(new DirectoryNotFound(undefined, { cause: ex }));
    }

    throw ex;
  }

  const packageJsonPath = path.join(directory, 'package.json');

  try {
    await fs.promises.access(packageJsonPath, fs.constants.R_OK);
  } catch (ex: unknown) {
    if ((ex as NodeJS.ErrnoException).code === 'ENOENT') {
      const upperDirectory = path.join(directory, '..');

      if (upperDirectory === directory) {
        return fail(new PackageJsonNotFound());
      }

      return await getApplicationRoot({ directory: upperDirectory });
    }

    throw ex;
  }

  return okay(directory);
};

export { getApplicationRoot };
