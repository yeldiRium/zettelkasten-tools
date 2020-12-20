import { buntstift } from 'buntstift';
import { Command } from 'command-line-interface';
import { defaultTemplateName } from '../../domain/constants/defaultTemplateName';
import { format } from 'date-fns';
import fs from 'fs';
import { generateZettelId } from '../../domain/generateZettelId';
import { getApplicationRoot } from '../../utils/getApplicationRoot';
import { NewOptions } from './NewOptions';
import path from 'path';
import { renderFile } from '../../utils/ejs/renderFile';
import { unpackOrCrash } from '@yeldirium/result';

const newCommand = function (): Command<NewOptions> {
  return {
    name: 'new',
    description: 'Create a new zettel',

    optionDefinitions: [],

    async handle ({ options: { verbose, quiet }}): Promise<void> {
      buntstift.configure(
        buntstift.getConfiguration().
          withVerboseMode(verbose && !quiet)
      );

      const cwd = process.cwd();
      const appRoot = unpackOrCrash(await getApplicationRoot({ directory: __dirname }));

      const newId = generateZettelId();
      const newZettelPath = path.join(cwd, `${newId}.md`);

      const selectedTemplate = path.join(appRoot, 'static', 'templates', `${defaultTemplateName}.md.ejs`);

      const currentDate = new Date();
      const data = {
        date: {
          iso: format(currentDate, `yyyy-MM-dd'T'hh:mm`)
        }
      };

      if (!quiet) {
        buntstift.info(`Creating new zettel ${newId}...`);
      }

      const renderedZettel = unpackOrCrash(await renderFile({ path: selectedTemplate, data }));

      if (verbose && !quiet) {
        buntstift.raw(`${renderedZettel}\n`);
      }

      await fs.promises.writeFile(newZettelPath, renderedZettel, 'utf-8');

      if (quiet) {
        buntstift.raw(`${path.basename(newZettelPath)}\n`);
      }
    }
  };
};

export { newCommand };
