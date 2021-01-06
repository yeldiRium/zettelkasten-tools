import { buntstift } from 'buntstift';
import { Command } from 'command-line-interface';
import { defaultTemplateName } from '../../domain/constants/defaultTemplateName';
import { findTemplates } from '../../domain/findTemplates';
import { findUserTemplates } from '../../domain/findUserTemplates';
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
      },
      {
        name: 'output-directory',
        alias: 'o',
        type: 'string',
        isRequired: false
      }
    ],

    async handle ({ options: {
      verbose,
      'no-interaction': noInteractionFlag,
      template: templateName,
      'output-directory': outputDirectory
    }}): Promise<void> {
      const noInteraction = noInteractionFlag || !buntstift.getConfiguration().isInteractiveSession;

      buntstift.configure(
        buntstift.getConfiguration().
          withVerboseMode(verbose).
          withQuietMode(noInteraction)
      );

      const availableTemplates = [
        ...await findTemplates(),
        ...await findUserTemplates({ zettelkastenDirectory: process.cwd() })
      ];
      const selectedTemplate = availableTemplates.find(
        (template): boolean => template.name === templateName
      );

      if (selectedTemplate === undefined) {
        throw new TemplateNotFound(`Template '${templateName}' could not be found.`);
      }

      const newId = generateZettelId();
      const newZettelDirectory = outputDirectory ?? process.cwd();
      const newZettelPath = path.join(newZettelDirectory, `${newId}.md`);

      const currentDate = new Date();
      const data = {
        date: {
          format: (formatString: string): string => format(currentDate, formatString),
          iso: format(currentDate, `yyyy-MM-dd'T'HH:mm`),
          slashes: format(currentDate, `yyyy'/'MM'/'dd`),
          dashes: format(currentDate, `yyyy'-'MM'-'dd`)
        }
      };

      buntstift.info(`Creating new zettel ${newId}...`);

      await fs.promises.mkdir(newZettelDirectory, { recursive: true });

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
