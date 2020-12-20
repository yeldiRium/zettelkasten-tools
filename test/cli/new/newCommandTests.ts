import { assert } from 'assertthat';
import { format } from 'date-fns';
import fs from 'fs';
import { getHandlers } from '../../../lib/cli/getHandlers';
import { idLength } from '../../../lib/domain/generateZettelId';
import { isolated } from 'isolated';
import path from 'path';
import { record } from 'record-stdstreams';
import { rootCommand } from '../../../lib/cli/rootCommand';
import { runCli } from 'command-line-interface';
import { stripIndent } from 'common-tags';
import timekeeper from 'timekeeper';

suite('zkt', (): void => {
  let appDirectory: string;

  setup(async (): Promise<void> => {
    appDirectory = await isolated();
    process.cwd = (): string => appDirectory;
  });

  teardown(async (): Promise<void> => {
    await fs.promises.rm(appDirectory, { force: true, recursive: true });
  });

  suite('new', (): void => {
    test('creates a new zettel with a random id and reports it.', async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ 'new' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.containing('Creating new zettel ');

      const files = await fs.promises.readdir(appDirectory);

      assert.that(files.length).is.equalTo(1);
    });

    test('creates a new zettel with the empty template.', async (): Promise<void> => {
      const time = new Date();
      const stop = record(false);

      timekeeper.freeze(time);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ 'new' ],
        handlers: getHandlers()
      });

      stop();

      const files = await fs.promises.readdir(appDirectory);
      const fileContent = await fs.promises.readFile(path.join(appDirectory, files[0]), 'utf-8');

      assert.that(fileContent).is.startingWith(
        stripIndent`
          ---
          date: ${format(time, `yyyy-MM-dd'T'hh:mm`)}
          ---
          
          `
      );
    });
  });

  suite('--verbose new', (): void => {
    test('prints the zettel content.', async (): Promise<void> => {
      const time = new Date();
      const stop = record(false);

      timekeeper.freeze(time);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--verbose', 'new' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.containing(
        stripIndent`
          ---
          date: ${format(time, `yyyy-MM-dd'T'hh:mm`)}
          ---
          
          `
      );
    });
  });

  suite('--quiet new', (): void => {
    test('prints only the file name of the new zettel.', async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--quiet', 'new' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.not.containing('Creating new zettel ');
      assert.that(stdout.length).is.equalTo(idLength + '.md\n'.length);
    });
  });
});
