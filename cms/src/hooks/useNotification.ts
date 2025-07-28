import { toast } from "sonner"

type NotifyType = "success" | "error" | "info" | "warning"

type NotifyOptions = {
  title: string
  description?: string
  type?: NotifyType
  duration?: number
}

export function useNotification() {
  const notify = ({
    title,
    description,
    type = "info",
    duration = 3000,
  }: NotifyOptions) => {
    toast[type](title, {
      description,
      duration,
    })
  }

  return { notify }
}
