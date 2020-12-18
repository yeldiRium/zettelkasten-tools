import { buntstift } from 'buntstift';
import { Handlers } from 'command-line-interface';
import { isCustomError } from '@yeldirium/kaputt';

const getHandlers = function (): Partial<Handlers> {
  return {
    commandFailed ({ ex }): void {
      if (isCustomError(ex)) {
        buntstift.error(ex.message);
        buntstift.verbose(ex.stack ?? 'No stacktrace available.');
      }
    },

    commandUnknown ({ unknownCommandName, recommendedCommandName }): void {
      buntstift.error(`Unknown command '${unknownCommandName}', did you mean '${recommendedCommandName}'?`);
    },

    optionInvalid ({ reason }): void {
      buntstift.error(reason);
    },

    optionMissing ({ optionDefinition }): void {
      buntstift.error(`Option '${optionDefinition.name}' is missing.`);
    },

    optionUnknown ({ optionName }): void {
      buntstift.error(`Unknown option '${optionName}'.`);
    }
  };
};

export { getHandlers };
