import { assert } from 'assertthat';
import { buntstift } from 'buntstift';
import { getHandlers } from '../../../lib/cli/getHandlers';
import path from 'path';
import { record } from 'record-stdstreams';
import { rootCommand } from '../../../lib/cli/rootCommand';
import { runCli } from 'command-line-interface';
import { setCwd } from '../../shared/setCwd';

buntstift.configure(
  buntstift.getConfiguration().withInteractiveSession(true)
);

// @ts-expect-error Disable process.exit for better test experience with command-line-interface
// eslint-disable-next-line @typescript-eslint/no-empty-function
process.exit = (): never => {};

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
      assert.that(stdout).is.containing('daily-link');
      assert.that(stdout).is.containing('empty (default)');
    });

    test('lists all user-defined templates.', async (): Promise<void> => {
      const stop = record(false);
      const resetCwd = setCwd({ directory: path.join(__dirname, '..', '..', 'shared') });

      await runCli({
        rootCommand: rootCommand(),
        argv: [ 'templates' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.containing('The available templates are:');
      assert.that(stdout).is.containing('another');
      assert.that(stdout).is.containing('daily-link');
      assert.that(stdout).is.containing('empty (default)');
      assert.that(stdout).is.containing('test');

      resetCwd();
    });
  });

  suite('--no-interaction new', (): void => {
    test(`lists only the templates' file names without any formatting and without marking the default.`, async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--no-interaction', 'templates' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.equalTo('daily-link\nempty\n');
    });
  });
});
