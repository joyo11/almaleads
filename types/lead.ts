export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visasInterested: string[];
  resumeUrl?: string;
  additionalInfo: string;
  status: "PENDING" | "REACHED_OUT";
  submittedAt: string;
  country: string;
}

export interface CreateLeadRequest {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visasInterested: string[];
  resumeFile?: File;
  additionalInfo: string;
  country: string;
}

export interface UpdateLeadStatusRequest {
  id: string;
  status: "PENDING" | "REACHED_OUT";
}
