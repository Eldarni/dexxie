
//
import { atom, useAtom, getDefaultStore } from 'jotai'

//
const selectionModeAtom = atom('normal')
const selectedItemsAtom = atom<string[]>([])

//
export { useAtom, selectionModeAtom, selectedItemsAtom }
