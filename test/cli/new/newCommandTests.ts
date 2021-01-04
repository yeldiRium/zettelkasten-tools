import { assert } from 'assertthat';
import { buntstift } from 'buntstift';
import fs from 'fs';
import { getHandlers } from '../../../lib/cli/getHandlers';
import { idLength } from '../../../lib/domain/generateZettelId';
import { isolated } from 'isolated';
import path from 'path';
import { record } from 'record-stdstreams';
import { rootCommand } from '../../../lib/cli/rootCommand';
import { runCli } from 'command-line-interface';
import shelljs from 'shelljs';
import sinon from 'sinon';
import { stripIndent } from 'common-tags';
import timekeeper from 'timekeeper';

buntstift.configure(
  buntstift.getConfiguration().withInteractiveSession(true)
);

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
      const time = new Date('2020-12-26T00:00');
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
          date: 2020-12-26T00:00
          ---
          
          `
      );
    });

    test('formats the iso date correctly.', async (): Promise<void> => {
      const time = new Date('2020-12-26T15:20');
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
          date: 2020-12-26T15:20
          ---
          
          `
      );
    });

    suite('--template', (): void => {
      test('creates a new zettel with the empty template if explicitly asked to.', async (): Promise<void> => {
        const time = new Date('2020-12-26T00:00');
        const stop = record(false);

        timekeeper.freeze(time);

        await runCli({
          rootCommand: rootCommand(),
          argv: [ 'new', '--template', 'empty' ],
          handlers: getHandlers()
        });

        stop();

        const files = await fs.promises.readdir(appDirectory);
        const fileContent = await fs.promises.readFile(path.join(appDirectory, files[0]), 'utf-8');

        assert.that(fileContent).is.startingWith(
          stripIndent`
          ---
          date: 2020-12-26T00:00
          ---
          `
        );
      });

      test(`creates a new zettel with the 'daily-link' template.`, async (): Promise<void> => {
        const time = new Date('2020-12-26T00:00');
        const stop = record(false);

        timekeeper.freeze(time);

        await runCli({
          rootCommand: rootCommand(),
          argv: [ 'new', '--template', 'daily-link' ],
          handlers: getHandlers()
        });

        stop();

        const files = await fs.promises.readdir(appDirectory);
        const fileContent = await fs.promises.readFile(path.join(appDirectory, files[0]), 'utf-8');

        assert.that(fileContent).is.startingWith(
          stripIndent`
            ---
            date: 2020-12-26T00:00
            tags:
              - daily/2020/12/26
              - link
              - comment
            ---
            # Daily link
            
            | Source    | []() |
            |-----------|------------------------------------------------|
            | Medium    |                                                |
            | Publisher |                                                |
            | Authors   |                                                |
            | Hosts     |                                                |
            | Guests    |                                                |
            | Topics    |                                                |
            
            ## Comments
            
            ## Fulltext
          `
        );
      });

      test(`creates a new zettel with a user-defined template.`, async (): Promise<void> => {
        const stop = record(false);

        shelljs.cp(
          '-r',
          path.join(__dirname, '..', '..', 'shared', 'templates'),
          path.join(appDirectory, 'templates')
        );

        await runCli({
          rootCommand: rootCommand(),
          argv: [ 'new', '--template', 'test' ],
          handlers: getHandlers()
        });

        stop();

        const files = await fs.promises.readdir(appDirectory);
        const fileContent = await fs.promises.readFile(path.join(appDirectory, files[0]), 'utf-8');

        assert.that(fileContent).is.startingWith(
          stripIndent`
            ---
            date: 2020-12-26T00:00
            ---
            # Test
          `
        );
      });

      test('returns exit code 1 and outputs an error message if the template name can not be found.', async (): Promise<void> => {
        const exitStub = sinon.stub(process, 'exit');
        const stop = record(false);

        await runCli({
          rootCommand: rootCommand(),
          argv: [ 'new', '--template', 'does-not-exist' ],
          handlers: getHandlers()
        });

        const { stdout, stderr } = stop();

        assert.that(exitStub.calledWith(1)).is.true();
        assert.that(stdout).is.equalTo('');
        assert.that(stderr).is.containing(`Template 'does-not-exist' could not be found.`);

        exitStub.restore();
      });
    });
  });

  suite('--verbose new', (): void => {
    test('prints the zettel content.', async (): Promise<void> => {
      const time = new Date('2020-12-26T00:00');
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
          date: 2020-12-26T00:00
          ---
          
          `
      );
    });
  });

  suite('--no-interaction new', (): void => {
    test('prints only the file name of the new zettel.', async (): Promise<void> => {
      const stop = record(false);

      await runCli({
        rootCommand: rootCommand(),
        argv: [ '--no-interaction', 'new' ],
        handlers: getHandlers()
      });

      const { stdout } = stop();

      assert.that(stdout).is.not.containing('Creating new zettel ');
      assert.that(stdout.length).is.equalTo(idLength + '.md\n'.length);
    });
  });
});
