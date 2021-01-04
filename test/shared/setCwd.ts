const setCwd = function ({ directory }: {
  directory: string;
}): () => void {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const previousCwd = process.cwd;

  process.cwd = (): string => directory;

  return (): void => {
    process.cwd = previousCwd;
  };
};

export { setCwd };
