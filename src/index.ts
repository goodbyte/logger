import chalk, {Chalk} from 'chalk';

type Level = 'debug' | 'log' | 'info' | 'warn' | 'error';

type ChainablePropertyNames<T> = {
  [K in keyof T]: T[K] extends T ? K : never;
}[keyof T];

interface LogEntry {
  level: Level,
  message: string,
  timestamp: string;
}

class Logger {
  static logs: Record<string, LogEntry[]> = {};

  private static add(level: Level, ...args: any[]) {
    const colors: Record<Level, ChainablePropertyNames<Chalk>> = {
      debug: 'white',
      log: 'blue',
      info: 'green',
      warn: 'yellow',
      error: 'red'
    };

    const color = colors[level];
    const levelStr = chalk[color](`[${level.toUpperCase()}]`);
 
    const time = `[${new Date().toLocaleTimeString()}]`;
    console[level](`${levelStr}${time}`, ...args);
  }

  static debug(...args: any[]) {
    Logger.add('debug', ...args);
  }

  static log(...args: any[]) {
    Logger.add('log', ...args);
  }

  static info(...args: any[]) {
    Logger.add('info', ...args);
  }

  static warn(...args: any[]) {
    Logger.add('warn', ...args);
  }

  static error(...args: any[]) {
    Logger.add('error', ...args);
  }

  constructor(public id: string) {}

  private add(level: Level, ...args: any[]) {
    const storage = Logger.logs[this.id];
    const message = args.map((a) => JSON.stringify(a, null, 2)).join(' ');
    if (!storage || !Array.isArray(storage)) Logger.logs[this.id] = [];
    Logger.logs[this.id].push({message, level, timestamp: new Date().toLocaleString()});
  }

  get(): LogEntry[] {
    return Logger.logs[this.id];
  }

  debug(...args: any[]) {
    this.add('debug', ...args);
  }

  log(...args: any[]) {
    this.add('log', ...args);
  }

  info(...args: any[]) {
    this.add('info', ...args);
  }

  warn(...args: any[]) {
    this.add('warn', ...args);
  }

  error(...args: any[]) {
    this.add('error', ...args);
  }
}

export default Logger;