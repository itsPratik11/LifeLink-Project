export interface ActiveShortageAlert {
  id: string;
  bloodGroup: string; // e.g. "O-Negative"
  hospitalName: string;
  city: string;
  unitsLeft: number;
  message: string;
  postedAt: string;
  urgency: "CRITICAL" | "EMERGENCY";
}

// When hospitals flag a shortage, it appears here.
// If this list is empty, the marquee ticker is completely hidden.
export const ACTIVE_SHORTAGE_ALERTS: ActiveShortageAlert[] = [
  {
    id: "alert-1",
    bloodGroup: "O-Negative",
    hospitalName: "AIIMS Apex Trauma Center, New Delhi",
    city: "Delhi NCR",
    unitsLeft: 1,
    message: "URGENT SOS: O-Negative is critically insufficient (1 unit left) at AIIMS Trauma Center. Emergency trauma surgery in progress.",
    postedAt: "Just now",
    urgency: "CRITICAL"
  },
  {
    id: "alert-2",
    bloodGroup: "B-Negative",
    hospitalName: "Safdarjung Hospital Emergency Ward",
    city: "Delhi NCR",
    unitsLeft: 0,
    message: "OUT OF STOCK: B-Negative blood supply is exhausted at Safdarjung Hospital. Immediate donor required for pediatric care.",
    postedAt: "12 mins ago",
    urgency: "EMERGENCY"
  }
];
