import moment from "moment";

export type TLogSeverity =
  | "debug"
  | "info"
  | "notice"
  | "warning"
  | "error"
  | "critical"
  | "alert"
  | "emergency";

export interface ILogAdapter {
  getType(): string;
  dump(severity: TLogSeverity, message: string): string;
}

export class LogFactory {
  _type: string;

  constructor(type: string): void {
    this._type = type;
  }

  build(): ILogAdapter {
    switch (this._type) {
      case "stream":
      default:
        return new StreamAdapter();
      case "syslog":
        return new SyslogAdapter();
    }
  }
}

export class StreamAdapter implements ILogAdapter {
  _type: string;

  constructor(): void {
    this._type = "stream";
  }

  getType(): string {
    return this._type;
  }

  dump(severity: TLogSeverity, message: string): string {
    const when: string = moment().format();

    return `${when} [${severity}] ${message}`;
  }
}

export class SyslogAdapter implements ILogAdapter {
  _type: string;

  constructor(): void {
    this._type = "syslog";
  }

  getType(): string {
    return this._type;
  }

  dump(severity: TLogSeverity, message: string): string {
    const when: string = moment().format();
    const hostname: string = "127.0.0.1";

    return `${when} [${severity}] ${hostname} ${message}`;
  }
}
