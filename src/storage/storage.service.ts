/**
 * Abstract class for fetching files from a
 * storage provider.
 */
export abstract class StorageProvider {
  /**
   * Fetches a file from the storage provider
   * @param path the path to the file to fetch
   *
   * @returns contents of the file
   */
  abstract get(path: string): { success: boolean; data: any };

  /**
   * Sets a file in the storage provider
   * @param path the path to the file to set
   * @param value the value to set the file to
   *
   * @returns true if the file was set successfully
   */
  abstract set(path: string, value: any): boolean;
}
