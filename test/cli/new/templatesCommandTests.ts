import { assert } from 'assertthat';
import { getHandlers } from '../../../lib/cli/getHandlers';
import { record } from 'record-stdstreams';
import { rootCommand } from '../../../lib/cli/rootCommand';
import { runCli } from 'command-line-interface';

suite('zkt', (): void => {
  suite('templates', (): void => {
    test('lists all predefined templates and marks the default one.', async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ 'templates' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.containing('The available templates are:');
      assert.that(stdout).is.containing('empty (default)');
    });
  });

  suite('--quiet new', (): void => {
    test(`lists only the templates' file names without any formatting and without marking the default.`, async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--quiet', 'templates' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.equalTo('empty\n');
    });
  });
});
