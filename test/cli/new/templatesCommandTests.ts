import { assert } from 'assertthat';
import { buntstift } from 'buntstift';
import { getHandlers } from '../../../lib/cli/getHandlers';
import { record } from 'record-stdstreams';
import { rootCommand } from '../../../lib/cli/rootCommand';
import { runCli } from 'command-line-interface';

suite('zkt', (): void => {
  buntstift.configure(
    buntstift.getConfiguration().withInteractiveSession(true)
  );

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

  suite('--no-interaction new', (): void => {
    test(`lists only the templates' file names without any formatting and without marking the default.`, async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--no-interaction', 'templates' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.equalTo('empty\n');
    });
  });
});
