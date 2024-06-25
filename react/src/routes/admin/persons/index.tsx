import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/persons/')({
  component: () => <div>Hello /admin/persons/!</div>
})