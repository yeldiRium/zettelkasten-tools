import { EjsRenderingFailed } from '../../errors';
import ejs, { Data, Options } from 'ejs';
import { fail, okay, Result } from '@yeldirium/result';

const renderFile = async function ({ path, data, options }: {
  path: string;
  data?: Data;
  options?: Options;
}): Promise<Result<string, EjsRenderingFailed>> {
  try {
    return okay(await ejs.renderFile(path, data, options));
  } catch (ex: unknown) {
    return fail(new EjsRenderingFailed(undefined, { cause: ex }));
  }
};

export {
  renderFile
};
