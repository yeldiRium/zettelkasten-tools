import fs from 'fs';
import path from 'path';
import { Template } from './elements/Template';

const findUserTemplates = async function ({ zettelkastenDirectory }: {
  zettelkastenDirectory: string;
}): Promise<Template[]> {
  const userTemplateFolder = path.join(zettelkastenDirectory, 'templates');

  try {
    await fs.promises.access(userTemplateFolder, fs.constants.R_OK);
  } catch {
    return [];
  }

  const filesInUserTemplateFolder = await fs.promises.readdir(userTemplateFolder);

  const templateFiles = filesInUserTemplateFolder.filter(
    (fileName): boolean => fileName.endsWith('.md.ejs')
  );

  const templates = templateFiles.map((fileName): Template => ({
    name: path.basename(fileName, '.md.ejs'),
    path: path.join(userTemplateFolder, fileName)
  }));

  return templates;
};

export { findUserTemplates };
