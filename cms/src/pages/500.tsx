import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function InternalServerError() {
  const navigate = useNavigate()
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">Oops! Something went wrong!</span>
        <p className="text-center text-muted-foreground">
          An unexpected error has occurred on the server.<br />
          Please try again later or contact support if the problem persists.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  )
}
