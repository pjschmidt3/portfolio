'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Home,
  BriefcaseIcon,
  FolderKanbanIcon,
  FileTextIcon,
  EyeIcon,
  DownloadIcon,
  MailIcon
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export const Navigation = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm py-4 px-6">
      <div className="flex items-center justify-between w-full">
        <NavigationMenu>
          <NavigationMenuList
            className="gap-2"
            role="menubar">
            <NavigationMenuItem role="menuitem">
              <Link
                href="/"
                data-active={isActive('/')}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors px-4 py-2 relative gap-2',
                  isActive('/')
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-foreground hover:text-primary'
                )}>
                <Home
                  className="size-4"
                  aria-hidden="true"
                />
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem role="menuitem">
              <Link
                href="/experience"
                data-active={isActive('/experience')}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors px-4 py-2 relative gap-2',
                  isActive('/experience')
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-foreground hover:text-primary'
                )}>
                <BriefcaseIcon
                  className="size-4"
                  aria-hidden="true"
                />
                Experience
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem role="menuitem">
              <Link
                href="/projects"
                data-active={isActive('/projects')}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors px-4 py-2 relative gap-2',
                  isActive('/projects')
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-foreground hover:text-primary'
                )}>
                <FolderKanbanIcon
                  className="size-4"
                  aria-hidden="true"
                />
                Projects
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem role="menuitem">
              <NavigationMenuTrigger
                data-active={isActive('/resume')}
                className={cn(
                  'text-base font-medium relative gap-2',
                  isActive('/resume')
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-[40%] after:-translate-x-1/2 after:w-[45%] after:h-0.5 after:bg-primary after:rounded-full'
                    : ''
                )}>
                <FileTextIcon
                  className="size-4"
                  aria-hidden="true"
                />
                Resume
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[200px]">
                  <li>
                    <Link
                      href="/resume"
                      className={cn(
                        'flex items-center gap-2 select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors',
                        isActive('/resume')
                          ? 'bg-muted text-primary font-semibold'
                          : 'text-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground'
                      )}>
                      <EyeIcon
                        className="size-4"
                        aria-hidden="true"
                      />
                      View
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/Phillip_Schmidt_Senior_React_Developer.pdf"
                      target="_blank"
                      className="flex items-center gap-2 select-none rounded-md p-3 text-sm leading-none text-foreground no-underline outline-none transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground">
                      <DownloadIcon
                        className="size-4"
                        aria-hidden="true"
                      />
                      Download
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem role="menuitem">
              <Link
                href="/contact"
                data-active={isActive('/contact')}
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors px-4 py-2 relative gap-2',
                  isActive('/contact')
                    ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full'
                    : 'text-foreground hover:text-primary'
                )}>
                <MailIcon
                  className="size-4"
                  aria-hidden="true"
                />
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </nav>
  )
}
