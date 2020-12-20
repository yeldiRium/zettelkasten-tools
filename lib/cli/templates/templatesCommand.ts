import { buntstift } from 'buntstift';
import { Command } from 'command-line-interface';
import { defaultTemplateName } from '../../domain/constants/defaultTemplateName';
import { findTemplates } from '../../domain/findTemplates';
import { oneLine } from 'common-tags';
import { TemplatesOptions } from './TemplatesOptions';

const templatesCommand = function (): Command<TemplatesOptions> {
  return {
    name: 'templates',
    description: 'Lists all available templates',

    optionDefinitions: [],

    async handle ({ options: { verbose, quiet }}): Promise<void> {
      buntstift.configure(
        buntstift.getConfiguration().
          withVerboseMode(verbose && !quiet)
      );

      const availableTemplates = await findTemplates();

      if (!quiet) {
        buntstift.info('The available templates are:');
      }

      for (const template of availableTemplates) {
        if (quiet) {
          buntstift.raw(`${template.name}\n`);
        } else {
          buntstift.list(
            oneLine`
              ${template.name}
              ${template.name === defaultTemplateName ? ' (default)' : ''}
            `
          );
        }
      }
    }
  };
};

export { templatesCommand };
