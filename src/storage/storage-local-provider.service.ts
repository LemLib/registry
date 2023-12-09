import { Injectable } from '@nestjs/common';
import { existsSync, mkdir, readFile, writeFile } from 'fs';

const localPath = 'data/';

/**
 * Storage provider for local file system
 * Uses the file system on the host machine
 * to store and retrieve files
 *
 * @extends StorageProvider
 */
@Injectable()
export class StorageLocalProviderService {
  private isInitialized = false;

  /**
   * Initializes the local storage provider
   * Creates the data directory if it does not exist
   */
  private initialize(): void {
    if (!this.isInitialized && !existsSync(localPath)) {
      mkdir(localPath, (err) => {
        if (err)
          console.error('Failed to initialize local storage provider: ', err);
        else this.isInitialized = true;
      });
    }
  }

  /**
   * Fetches a file from the local storage provider
   *
   * @param path the path to the file to fetch
   * @returns if the file was fetched successfully, and the contents of the file
   */
  public async get(path: string): Promise<{ success: boolean; data: string }> {
    this.initialize();

    return new Promise((resolve, reject) => {
      readFile(localPath + path, (err, data) => {
        if (err) {
          console.error(
            'Failed to get file from local storage provider: ',
            err,
          );
          reject({ success: false, data: null });
        } else {
          resolve({ success: true, data: data.toString() });
        }
      });
    });
  }

  /**
   * Sets a file in the local storage provider
   *
   * @param path the path to the file to set
   * @param value the value to set the file to
   * @returns true if the file was set successfully
   */
  public async set(path: string, value: any): Promise<boolean> {
    this.initialize();

    if (!existsSync(localPath + path)) {
      return new Promise((resolve, reject) => {
        reject('File does not exist');
      });
    }

    return new Promise((resolve, reject) => {
      writeFile(localPath + path, value, (err) => {
        if (err) {
          console.error('Failed to set file in local storage provider: ', err);
          return reject(false);
        } else resolve(true);
      });
    });
  }
}
