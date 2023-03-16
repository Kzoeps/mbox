export enum PrimaryInfo {
  Journal = "Jrnl. No",
  Amount = "Nu.",
  Remark = "Purpose/Bill QR",
  Date = "Date",
}

export enum DateFormats {
  Date = "DD MMM YYYY",
  DisplayDate = "DD/MMM/YYYY",
  ListingDisplay = "MMM DD, YYYY",
  BoxDateDisplay = "MMM DD",
  CalendarDate = "YYYY-MM-DD",
  DateTime = "DD MMM YYYY HH:mm:ss",
  CalendarDateTime = "YYYY-MM-DDTHH:mm:ss",
}

export enum MediaDevicesError {
  NotFound = "NotFoundError",
  NotAllowed = "NotAllowedError",
  Abort = "AbortError",
}

export enum MediaDevicesErrorMessages {
  NotFoundError = "No camera found, Camera might not be supported",
  NotAllowedError = "Camera access denied! Please allow camera access in your browser settings",
  AbortError = "Camera access aborted! Please refresh and try again",
}