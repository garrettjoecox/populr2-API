
import config from '../config';
import * as chalk from 'chalk';

const logLevels: { [index:string] : number }  = {
  verbose: 3,
  info: 2,
  error: 1,
};

export class Logger {
  private location: string;
  private logLevel: number;

  constructor(location?: string) {
    if (location) this.location = this.surround(location);
    this.logLevel = logLevels[config.logLevel] || 0;
  }

  spacer() {
    console.log();
  }

  log(...args: any[]) {
    if (this.location) args.unshift(this.location);
    console.log(...args);
  }

  verbose(...args: any[]) {
    if (this.logLevel < 3) return;

    if (this.location) args.unshift(this.location);
    args.unshift(this.surround(chalk.magenta('Verbose')));
    console.log(...args);
  }

  info(...args: any[]) {
    if (this.logLevel < 2) return;

    if (this.location) args.unshift(this.location);
    args.unshift(this.surround(chalk.green('Info')));
    console.log(...args);
  }

  error(...args: any[]) {
    if (this.logLevel < 1) return;

    if (this.location) args.unshift(this.location);
    args.unshift(this.surround(chalk.red('Error')));
    console.log(...args);
  }

  private surround(prefix: string) {
    return chalk.gray('[') + prefix + chalk.gray(']');
  }
}

export default new Logger();
