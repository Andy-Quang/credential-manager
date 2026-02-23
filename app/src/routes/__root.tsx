import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { AuthProvider } from '../components/AuthProvider'
import { ThemeProvider, useTheme } from '../components/ThemeProvider'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Credential Manager',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootDocument,
})

function RootDocument() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootContent />
      </ThemeProvider>
    </AuthProvider>
  )
}

function RootContent() {
  const { theme } = useTheme()

  return (
    <html lang="en" className={theme}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
