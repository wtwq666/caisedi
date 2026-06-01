import { isNativeApp } from '../lib/initNativeApp'

export function useNativeApp() {
  return isNativeApp()
}
