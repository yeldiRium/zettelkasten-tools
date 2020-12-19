import { kaputt } from '@yeldirium/kaputt';

class DirectoryNotFound extends kaputt('DirectoryNotFound') {}
class EjsRenderingFailed extends kaputt('EjsRenderingFailed') {}
class PackageJsonNotFound extends kaputt('PackageJsonNotFound') {}

export {
  DirectoryNotFound,
  EjsRenderingFailed,
  PackageJsonNotFound
};
