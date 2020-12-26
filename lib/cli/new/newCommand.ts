import { buntstift } from 'buntstift';
import { Command } from 'command-line-interface';
import { defaultTemplateName } from '../../domain/constants/defaultTemplateName';
import { findTemplates } from '../../domain/findTemplates';
import { format } from 'date-fns';
import fs from 'fs';
import { generateZettelId } from '../../domain/generateZettelId';
import { NewOptions } from './NewOptions';
import path from 'path';
import { renderFile } from '../../utils/ejs/renderFile';
import { TemplateNotFound } from '../../errors';
import { unpackOrCrash } from '@yeldirium/result';

const newCommand = function (): Command<NewOptions> {
  return {
    name: 'new',
    description: 'Create a new zettel',

    optionDefinitions: [
      {
        name: 'template',
        alias: 't',
        type: 'string',
        isRequired: false,
        defaultValue: defaultTemplateName
      }
    ],

    async handle ({ options: {
      verbose,
      'no-interaction': noInteractionFlag,
      template: templateName
    }}): Promise<void> {
      const noInteraction = noInteractionFlag || !buntstift.getConfiguration().isInteractiveSession;

      buntstift.configure(
        buntstift.getConfiguration().
          withVerboseMode(verbose).
          withQuietMode(noInteraction)
      );

      const availableTemplates = await findTemplates();
      const selectedTemplate = availableTemplates.find(
        (template): boolean => template.name === templateName
      );

      if (selectedTemplate === undefined) {
        throw new TemplateNotFound(`Template '${templateName}' could not be found.`);
      }

      const cwd = process.cwd();
      const newId = generateZettelId();
      const newZettelPath = path.join(cwd, `${newId}.md`);

      const currentDate = new Date();
      const data = {
        date: {
          iso: format(currentDate, `yyyy-MM-dd'T'HH:mm`),
          slashes: format(currentDate, `yyyy'/'MM'/'dd`)
        }
      };

      buntstift.info(`Creating new zettel ${newId}...`);

      const renderedZettel = unpackOrCrash(await renderFile({
        path: selectedTemplate.path,
        data
      }));

      if (verbose && !noInteraction) {
        buntstift.raw(`${renderedZettel}\n`);
      }

      await fs.promises.writeFile(newZettelPath, renderedZettel, 'utf-8');

      if (noInteraction) {
        buntstift.raw(`${path.basename(newZettelPath)}\n`);
      }
    }
  };
};

export { newCommand };
