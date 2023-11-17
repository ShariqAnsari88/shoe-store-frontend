
import { useDispatch } from 'react-redux'

import { store } from '@/store/rootReducer'
import { rootReducer } from '@/store/store'

export type AppDispatch = typeof rootReducer.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store>