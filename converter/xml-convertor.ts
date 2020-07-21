import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const whiteList = ['.gitkeep'];

const inputDataDir = path.join(__dirname, 'inputData');
const outDataDir = path.join(__dirname, 'outData');

const main = async (): Promise<void> => {
  const inputFiles = fs.readdirSync(inputDataDir);

  const queue = [];

  for (let i = 0; i < inputFiles.length; i += 1) {
    const inputFile = inputFiles[i];

    if (!whiteList.includes(inputFile)) {
      const cmd = [
        'encoda',
        'convert',
        path.join(inputDataDir, inputFile),
        path.join(outDataDir, inputFile.replace('xml', 'json')),
        '--from', 'jats',
      ];

      const execPromise = new Promise((resolve, reject) => {
        exec(cmd.join(' '), (err, stdout) => {
          if (err) {
            reject(err);
          }

          console.info(`stdout[${inputFile}-${i}]: ${stdout ?? 'Conversion done'}`);
          resolve(true);
        });
      })
        .catch((err: Error) => console.error(err));

      queue.push(execPromise);
    }
  }

  await Promise.all(queue);
};

main()
  .then(() => console.info('Conversion done!'))
  .catch((e: Error) => console.error(e));
