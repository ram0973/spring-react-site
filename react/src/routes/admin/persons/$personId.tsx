import {createFileRoute} from '@tanstack/react-router'

export const Route =
  createFileRoute('/admin/persons/$personId')({component: PersonComponent})

function PersonComponent() {
  const {personId} = Route.useParams()
  return <div>Person ID: {personId}</div>
}