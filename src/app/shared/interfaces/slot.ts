export interface Slot {
  _id?: string;
  date: string;
  start_time: string;
  end_time: string;
  booking_id?: string;
  doctor_id: {
    _id?: string;
    first_name: string;
    last_name: string;
    password: string;
    department: string;
    doctor_fees: string;
    email: string;
    mobile: number;
  };
  status: string;
}
