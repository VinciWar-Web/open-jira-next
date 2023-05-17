import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { UIProvider } from '@/context/ui'
import { EntriesProvider } from '@/context/entries'

import { lightTheme, darckTheme } from '@/themes'

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={ darckTheme }>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  )
}
