import fs from 'fs';
import { getApplicationRoot } from '../utils/getApplicationRoot';
import path from 'path';
import { Template } from './elements/Template';
import { unpackOrCrash } from '@yeldirium/result';

const findTemplates = async function (): Promise<Template[]> {
  const applicationRoot = unpackOrCrash(
    await getApplicationRoot({ directory: __dirname })
  );
  const templateFolder = path.join(applicationRoot, 'static', 'templates');

  const filesInTemplateFolder = await fs.promises.readdir(templateFolder);

  const templateFiles = filesInTemplateFolder.filter(
    (fileName): boolean => fileName.endsWith('.md.ejs')
  );

  const templates = templateFiles.map((fileName): Template => ({
    name: path.basename(fileName, '.md.ejs'),
    path: path.join(templateFolder, fileName)
  }));

  return templates;
};

export {
  findTemplates
};
