/**
 * Convert a hyphenated name into a camel case string
 * @param value The string to transform
 */
export function camelize(value: string = ''): string {
  return value
    .replace(/(-|_|\.|\s)+(.)?/g, (match, separator, character) =>
      character ? character.toUpperCase() : ''
    )
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}
