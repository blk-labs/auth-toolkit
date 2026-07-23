
/**
 * Utility function that filters out falsy values and joins class names (useful for conditional Tailwind classes).
 * This function removes any falsy values (false, undefined, null, empty strings) and combines
 * the remaining class strings into a single space-separated string.
 *
 * @param classes - Variable number of string/boolean/undefined class values
 * @returns Combined class name string
 *
 * @example
 * classNames('px-4', 'py-2', isActive && 'bg-blue-500') // 'px-4 py-2 bg-blue-500'
 * classNames('text-sm', false, undefined, 'text-gray-700') // 'text-sm text-gray-700'
 */
export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}