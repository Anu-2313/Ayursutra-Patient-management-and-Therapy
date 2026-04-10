/**
 * Merges class strings, filtering out all falsy values.
 * Returns a trimmed, space-joined string of truthy class names.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ').trim()
}

export default cn
