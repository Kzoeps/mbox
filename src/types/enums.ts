export enum PrimaryInfo {
  Journal = "jrnl. no",
  Amount = "nu.",
  Remark = "Purpose/Bill QR",
  Date = "Date",
}

export enum BNBPrimaryInfo {
  Journal = "reference no",
  Remark = "remarks"
}

export enum PNBPrimaryInfo {
  Journal = "ref. no.",
  Remark = "remarks"
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

export enum BankIdentifier {
  BNB = "mpay",
  BOB = "mbob",
  PNB = "drukpay"
}