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

    async handle ({ options: {
      verbose,
      'no-interaction': noInteractionFlag
    }}): Promise<void> {
      const noInteraction = noInteractionFlag || !buntstift.getConfiguration().isInteractiveSession;

      buntstift.configure(
        buntstift.getConfiguration().
          withVerboseMode(verbose).
          withQuietMode(noInteraction)
      );

      const availableTemplates = await findTemplates();

      buntstift.info('The available templates are:');

      for (const template of availableTemplates) {
        if (noInteraction) {
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
