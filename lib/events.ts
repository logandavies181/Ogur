export type KeyDownEvent = {
  code: string
}

export const KeyDownKeys = {
  left: "ArrowLeft",
  right: "ArrowRight",
} as const

export type SwipeEvent = {
  detail: SwipeData
}

export type SwipeData = {
  dir: "up" | "down" | "left" | "right"
}

export type Callback<T> = (t: T) => void

class Topic<T> {
  private callbacks: Callback<T>[] = []

  public Subscribe(cb: Callback<T>) {
    this.callbacks.push(cb)
  }

  public Publish(t: T) {
    this.callbacks.forEach((cb) => {
      cb(t)
    })
  }
}

export const KeyDownTopic = new Topic<KeyDownEvent>()

export const SwipeTopic = new Topic<SwipeEvent>()
