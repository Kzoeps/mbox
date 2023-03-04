import {
  AnalyticsRecord,
  AnalyticsRecordTrack,
  NavItem,
  PhoneSignUpForm,
  RecordsColumn,
} from "../types/misc.types";
import dayjs from "dayjs";

export const RECORDS_COLUMNS: readonly RecordsColumn[] = [
  { id: "journalNumber", label: "Journal number", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 100 },
  {
    id: "phoneNumber",
    label: "Phone number",
    minWidth: 170,
    align: "right",
  },
  {
    id: "remarks",
    label: "Remarks",
    minWidth: 170,
    align: "right",
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value: Date) => dayjs(value).format(`YYYY-MM-DD`),
  },
];

export const UNAUTHENTICATED_NAV_ITEMS: NavItem[] = [
  {
    label: "Pricing",
    href: "/pricing",
  },
  { label: "Demo", href: "/demo" },
];

export const AUTHENTICATED_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "View Records",
    href: `/records`,
  },
  {
    label: "Add Record",
    href: "/add-record",
  },
  { label: "Subscribe", href: "/subscribe" },
  ...UNAUTHENTICATED_NAV_ITEMS,
];

export const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 1200,
  useWebWorker: false,
};

export const LOCATION_INDEX_MAP: Record<string, number> = {
  "/dashboard": 0,
  "/add-record": 1,
  "/records": 2,
};

export const INDEX_LOCATION: Record<number, string> = {
  0: "/dashboard",
  1: "/add-record",
  2: "/records",
};

export const BASE_PHONE_LOGIN: Pick<
  PhoneSignUpForm,
  "phoneNumber" | "verificationCode"
> = {
  phoneNumber: "",
  verificationCode: "",
};

export const PHONE_SIGN_UP: PhoneSignUpForm = {
  firstName: "",
  lastName: "",
  ...BASE_PHONE_LOGIN,
};

export const INITIAL_ANALYTICS_REDUCER_ACTION: AnalyticsRecordTrack = {
  highestMonthlyTxn: 0,
  highestDailyTxn: 0,
  monthlyTotal: 0,
  dailyTotal: 0,
};
