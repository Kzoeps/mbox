import { BaseReducerAction, NumString } from "../utils/util.types";

export interface ExtractedOCRData {
  amount: string | undefined;
  remarks: string | undefined;
  journalNumber: string | undefined;
  date: string;
}

export interface BaseRecordInfo {
  amount: string;
  journalNumber: string;
  remarks: string;
}

export interface MboxRecord {
  journalNumber: NumString;
  amount: NumString;
  remarks: string;
  phoneNumber: NumString;
  date: string | Date;
}

export interface SegregatedDateTime {
  date: string | undefined;
  time: string | undefined;
}

export type TableIds =
  | "journalNumber"
  | "amount"
  | "phoneNumber"
  | "remarks"
  | "date";

export interface RecordsColumn {
  id: TableIds;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: Date) => string;
}


export interface RecordData extends BaseRecordInfo {
  id: string;
  phoneNumber: number;
  date: Date;
}

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface StickyHeadTableProps {
  handleChangePage: (event: React.MouseEvent, page: number) => void;
  handleRowsChange: (event: React.MouseEvent, rowsPerPage: number) => void;
  records: RecordsTableData[];
  totalRecords: number;
  isLoadingData: boolean;
}

export interface FormattedRecordsResponse {
  lastVisibleRecord: any;
  data: RecordData[];
}

export interface TrialProfile {
  start_date: Date;
  expiry_date: Date;
  phone_number: string;
  payment_valid_till?: Date;
}

export interface SignUpBase {
  firstName: string;
  lastName: string;
}

export interface PhoneSignUpForm extends SignUpBase {
  //has to be in the format of +97517123456
  phoneNumber: string;
  verificationCode: string;
}

export interface VisionOCRData {
  detection?: DetectionEntity[] | null;
}
export interface DetectionEntity {
  locations?: null[] | null;
  properties?: null[] | null;
  mid?: string;
  locale?: string;
  description: string;
  score?: number;
  confidence?: number;
  topicality?: number;
  boundingPoly?: BoundingPoly;
}
export interface BoundingPoly {
  vertices?: VerticesEntity[] | null;
  normalizedVertices?: null[] | null;
}
export interface VerticesEntity {
  x: number;
  y: number;
}

export interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Analytics {
  highestTransaction: WithId<MboxRecord>;
  totalTransactions: number;
  totalAmount: number;
}

export interface AnalyticsRecord {
  date: Date;
  total: number;
  highestTransaction: number;
}

export interface AnalyticsRecordTrack {
  monthlyTotal: number;
  dailyTotal: number;
  highestDailyTxn: number;
  highestMonthlyTxn: number;
}

export interface RecordsTableData {
  journalNumber: string | number;
  id: string | number;
  amount: string;
  date: string;
  remarks: string;
  phoneNumber: string;
}

export type WithId<T> = {id: string} & T;

export type AnalyticsRecordAction = AnalyticsRecordTrack & BaseReducerAction;

export interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}
