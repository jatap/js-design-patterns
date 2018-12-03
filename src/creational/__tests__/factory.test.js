import {
  LogFactory,
  StreamAdapter,
  SyslogAdapter,
  ILogAdapter
} from "../factory";
import type { TLogSeverity } from "../factory";
import moment from "moment";

describe("Factory", () => {
  let logFactory: LogFactory;

  describe("LogFactory", () => {
    describe("#build", () => {
      describe("if type is stream", () => {
        beforeAll(() => {
          logFactory = new LogFactory("stream");
        });

        test("returns an object of type StreamAdapter", () => {
          expect(logFactory.build()).toBeInstanceOf(StreamAdapter);
        });
      });

      describe("if type is syslog", () => {
        beforeAll(() => {
          logFactory = new LogFactory("syslog");
        });

        test("returns an object of type SysLogAdapter", () => {
          expect(logFactory.build()).toBeInstanceOf(SyslogAdapter);
        });
      });

      test("returns stream if argument is not stream or syslog", () => {
        logFactory = new LogFactory("invalid");
        expect(logFactory.build()).toBeInstanceOf(StreamAdapter);
      });
    });
  });

  describe("StreamAdapter", () => {
    let streamAdapter: ILogAdapter;

    beforeAll(() => {
      logFactory = new LogFactory("stream");
      streamAdapter = logFactory.build();
    });

    test("#getType", () => {
      expect(streamAdapter.getType()).toBe("stream");
    });

    describe("#dump", () => {
      test("manages all severities", () => {
        const when: string = moment().format();
        const severities: Array<TLogSeverity> = [
          "debug",
          "info",
          "notice",
          "warning",
          "error",
          "critical",
          "alert",
          "emergency"
        ];
        const message: string = "Sample message";
        let action: string;
        let result: string;

        for (const severity: TLogSeverity of severities) {
          action = streamAdapter.dump(severity, message);
          result = `${when} [${severity}] ${message}`;

          expect(action).toBe(result);
        }
      });
    });
  });

  describe("SyslogAdapter", () => {
    let syslogAdapter: ILogAdapter;

    beforeAll(() => {
      logFactory = new LogFactory("syslog");
      syslogAdapter = logFactory.build();
    });

    test("#getType", () => {
      expect(syslogAdapter.getType()).toBe("syslog");
    });

    describe("#dump", () => {
      test("manages all severities", () => {
        const when: string = moment().format();
        const severities: Array<TLogSeverity> = [
          "debug",
          "info",
          "notice",
          "warning",
          "error",
          "critical",
          "alert",
          "emergency"
        ];
        const message: string = "Sample message";
        const hostname: string = "127.0.0.1";
        let action: string;
        let result: string;

        for (const severity: TLogSeverity of severities) {
          action = syslogAdapter.dump(severity, message);
          result = `${when} [${severity}] ${hostname} ${message}`;

          expect(action).toBe(result);
        }
      });
    });
  });
});
