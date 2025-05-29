export class JsonUtils {
  /**
   * Converts a JavaScript object to a JSON string.
   * @param value The object to convert.
   * @returns The JSON string representation of the object.
   */
  static tryParse<T>(value: string): T {
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new Error(`Error parsing JSON: ${e}`);
    }
  }

  static tryStringify<T>(value: T): string {
    try {
      return JSON.stringify(value);
    } catch (e) {
      throw new Error(`Error stringify JSON: ${e}`);
    }
  }
}
