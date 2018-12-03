type TCallableObj = {
  (string): string
};

const cache: Array<string> = [];

function s3info(file: string): string {
  return `[INFO] File: ${file} Collected from file system`;
}

export const s3infoProxy: TCallableObj = new Proxy(s3info, {
  apply(target: TCallableObj, thisArg: {}, args: Array<string>): any {
    const fileParam: string = args[0];

    if (cache.includes(fileParam)) {
      return `[INFO] File: ${fileParam} Collected from cache`;
    } else {
      cache.push(fileParam);

      return target.apply(thisArg, args);
    }
  }
});
