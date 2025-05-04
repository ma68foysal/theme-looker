type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  data?: Record<string, any>
  timestamp: Date
  userId?: string
  action?: string
}

export class Logger {
  private static instance: Logger

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  async debug(message: string, data?: Record<string, any>, userId?: string, action?: string) {
    return this.log("debug", message, data, userId, action)
  }

  async info(message: string, data?: Record<string, any>, userId?: string, action?: string) {
    return this.log("info", message, data, userId, action)
  }

  async warn(message: string, data?: Record<string, any>, userId?: string, action?: string) {
    return this.log("warn", message, data, userId, action)
  }

  async error(message: string, data?: Record<string, any>, userId?: string, action?: string) {
    return this.log("error", message, data, userId, action)
  }

  private async log(level: LogLevel, message: string, data?: Record<string, any>, userId?: string, action?: string) {
    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
      userId,
      action,
    }

    // Console logging
    const consoleMethod = level === "debug" ? "log" : level
    console[consoleMethod as keyof Console](`[${level.toUpperCase()}] ${message}`, data || "")

    // In a real app, you would store logs in a database or send to a logging service
    // Example:
    // await prisma.log.create({
    //   data: {
    //     level,
    //     message,
    //     data: data ? JSON.stringify(data) : null,
    //     timestamp: logEntry.timestamp,
    //     userId,
    //     action,
    //   },
    // });

    return logEntry
  }
}

// Export a singleton instance
export const logger = Logger.getInstance()
