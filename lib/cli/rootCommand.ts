import { Command } from 'command-line-interface';
import { newCommand } from './new/newCommand';
import { RootOptions } from './RootOptions';
import { templatesCommand } from './templates/templatesCommand';

const rootCommand = function (): Command<RootOptions> {
  return {
    name: 'zkt',
    description: 'A CLI that contains various tools for working with a markdown-based zettelkasten',

    optionDefinitions: [
      {
        name: 'verbose',
        alias: 'v',
        description: 'enable verbose mode',
        type: 'boolean',
        isRequired: false,
        defaultValue: false
      },
      {
        name: 'no-interaction',
        description: 'reduce output and remove formatting for scripting purposes',
        type: 'boolean',
        isRequired: false,
        defaultValue: false
      }
    ],

    handle ({ getUsage }): void {
      /* eslint-disable no-console */
      console.log(getUsage({ commandPath: [ 'zkt' ]}));
      /* eslint-enable no-console */
    },

    subcommands: {
      new: newCommand(),
      templates: templatesCommand()
    }
  };
};

export { rootCommand };
