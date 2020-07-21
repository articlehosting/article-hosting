import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const whiteList = ['.gitkeep'];

const inputDataDir = path.normalize(path.join(__dirname, 'inputData'));
const outDataDir = path.normalize(path.join(__dirname, 'outData'));

const main = async (): Promise<void> => {
  const inputFiles = fs.readdirSync(inputDataDir);

  const queue = [];

  for (let i = 0; i < inputFiles.length; i += i) {
    const inputFile = inputFiles[i];

    if (!whiteList.includes(inputFile)) {
      const spawnedProcess = spawn('encode convert --from jats', [
        path.join(inputDataDir, inputFile),
        path.join(outDataDir, inputFile.replace('xml', 'json')),
      ]);

      spawnedProcess.stdout.on('data', (data: string) => console.info(`stdout[${inputFile}-${i}]: ${data}`));
      spawnedProcess.stderr.on('data', (data: string) => console.info(`stdout[${inputFile}-${i}]: ${data}`));
      spawnedProcess.on('close', (code: number) => console.info(`Converting ${inputFile} was done with process code '${code}'`));
      queue.push(spawnedProcess);
    }
  }

  await Promise.all(queue);
};

main()
  .then(() => console.info('Conversion done!'))
  .catch((e: Error) => console.error(e));
