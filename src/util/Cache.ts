export class Cache<T> {

  private readonly map: Map<string, T> = new Map();

  async computeIfAbsent(key: string, func: Promise<T>): Promise<T> {
    const value = this.map.get(key);

    // it is correct check, do not write like !value (cause 0 would not be valid value in this case)
    if (value !== undefined && value !== null) {
      return value;
    }

    const computedValue = await func;
    this.map.set(key, computedValue);

    return computedValue;
  }

}
