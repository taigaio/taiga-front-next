export class UploadAdapterService {

  constructor(private loader: any, private uploadFunction: (file: unknown, value?: unknown) => void) {}

  public setUploadFunction(uploadFunction: (value?: unknown) => void) {
    this.uploadFunction = uploadFunction;
  }

  upload() {
    return this.loader.file
      .then((file: any) => {
        return new Promise((resolve) => {
          this.uploadFunction(file, resolve);
        });
      });
  }

  abort() {}
}
