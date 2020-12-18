#!/usr/bin/env node

import { buntstift } from 'buntstift';
import { getHandlers } from '../cli/getHandlers';
import { rootCommand } from '../cli/rootCommand';
import { runCli } from 'command-line-interface';

/* eslint-disable @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  try {
    await runCli({
      rootCommand: rootCommand(),
      argv: process.argv,
      handlers: getHandlers()
    });
  } catch (ex: unknown) {
    buntstift.error('An unexpected error occured.');
    // eslint-disable-next-line no-console
    console.error(ex);

    process.exit(1);
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
