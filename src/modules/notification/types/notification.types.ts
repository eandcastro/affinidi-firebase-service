type Message = {
  notificationType: string
  notificationMetadata?: string
}

type Notification = {
  title: string
  body: string
}

export type PushNotificationPayload = {
  data: Message
  notification: Notification
}
