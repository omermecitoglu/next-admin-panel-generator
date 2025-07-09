export function sortObjectKeysCaseSensitive(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeysCaseSensitive);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort() // case-sensitive sort
      .reduce((sortedObj, key) => {
        return {
          ...sortedObj,
          [key]: sortObjectKeysCaseSensitive((obj as Record<string, unknown>)[key]) as unknown,
        };
      }, {});
  }
  return obj; // primitives
}
