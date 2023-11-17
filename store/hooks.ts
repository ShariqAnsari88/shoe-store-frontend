import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '@/helpers/store'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
