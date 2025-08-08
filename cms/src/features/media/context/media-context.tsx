'use client'

import { api } from '@/lib/axios'
import type { Media } from '@/types/media.types'
import { createContext, useContext, useEffect, useReducer } from 'react'
import type { APIResponse } from '@/types/api.types'

interface MediaState {
  files: Media[]
  selectedItems?: Pick<Media, 'id'>[]
  viewMode?: 'grid' | 'list'
  filterType?: string
  filterDate?: string
  searchTerm?: string
  loading: boolean
  error: string | null
}

interface MediaAction {
  type: string
  payload?: any
}

const MediaContext = createContext<
  | {
      state: MediaState
      dispatch: React.Dispatch<MediaAction>
    }
  | undefined
>(undefined)

// Reducer
const mediaReducer = (state: MediaState, action: MediaAction): MediaState => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: action.payload }
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload }
    case 'SET_FILES':
      return { ...state, files: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.payload }
    case 'SET_FILTER_DATE':
      return { ...state, filterDate: action.payload }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload }
    case 'TOGGLE_ITEM_SELECTION':
      return {
        ...state,
        selectedItems: state.selectedItems?.includes(action.payload)
          ? state.selectedItems.filter((i) => i !== action.payload)
          : [...(state.selectedItems || []), action.payload],
      }
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

const initialState: MediaState = {
  files: [],
  selectedItems: [],
  loading: false,
  error: null,
  viewMode: 'grid',
}

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mediaReducer, initialState)

  // Gọi API khi component mount
  useEffect(() => {
    const fetchMedia = async () => {
      dispatch({ type: 'LOADING', payload: true })
      try {
        const res = await api.get<APIResponse<Media[]>>('/media')

        dispatch({ type: 'SET_FILES', payload: res.data.data })
      } catch (error: any) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      } finally {
        dispatch({ type: 'LOADING', payload: false })
      }
    }

    fetchMedia()
  }, [])

  return <MediaContext.Provider value={{ state, dispatch }}>{children}</MediaContext.Provider>
}

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (!context) throw new Error('useMedia must be used within a MediaProvider')
  return context
}
