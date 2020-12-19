import { Command } from 'command-line-interface';
import { newCommand } from './new/newCommand';
import { RootOptions } from './RootOptions';

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
        name: 'quiet',
        alias: 'q',
        description: 'reduce output for scripting purposes. overrides verbose',
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
      new: newCommand()
    }
  };
};

export { rootCommand };
