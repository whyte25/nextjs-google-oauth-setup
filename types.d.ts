import { StaticImageData } from "next/image";

interface clientsLogoTypes {
  id: number;
  image: StaticImageData;
}

interface innovatingDataTypes {
  id: number;
  icon: StaticImageData;
  title: string;
  description: string;
}

interface FaqTypes {
  id: number;
  title: string;
  description: string;
}

interface immediateAssessmentTypes {
  role: string;
  level: string;
  status: "sent" | "rejected" | "reviewing";
  personInCharge?: string;
  image?: string;
  name?: string;
  date?: string;
}

interface paginationDataInfo {
  docs: any[];
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalDocs: number;
  totalPages: number;
}

// shortlisted, reviewing, rejected;
export interface TalentTablDataTypes {
  id: string | number;
  first_name?: string;
  last_name?: string;
  email: string;
  role: string;
  status: string;
  images: string;
  phone_number: string;
}

export interface inviteTeamMemberTypes {
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
}

export interface LoginTypes {
  email: string;
  password: string;
}

export interface openPositionsTypes {
  title: string;
  location: string;
  slug: string;
  cta: string;
}

export interface appliedRolesDataTypes {
  id: number;
  jobTitle: string;
  img: any;
  date: string;
  company: string;
  status: "shortlisted" | "reviewing" | "rejected";
  country: string;
}

interface IReviewMyCv {
  cvFileUrl?: undefined | string;
  linkedInUrl?: undefined | string;
  talentNotes?: undefined | string;
  fileName?: undefined | string;
  linkedInPackage?: undefined | number;
  tier?: "beginner" | "intermediate" | "advanced";
}

export type ApplyForMeTypes = {
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  proxyAccountEmail: string | undefined;
  proxyAccountPassword: string | undefined;
  gender: string | undefined;
  maritalStatus: string | undefined;
  phone: string | undefined;
  currentLocation: {
    state: string;
    country: string;
  };
  socialMediaLinks: string[] | null;
  currentJobSector: string | undefined;
  currentJobRole: string | undefined;
  yearsOfExperience: string | undefined;
  topTenSkills: string[] | null;
  lastEmployerName: string | undefined;
  lastCompanyName: string | undefined;
  lastCompanyPhone: string | undefined;
  lastRoleExperience: string | undefined;
  applicantPortfolioFileUrl: string | undefined;
  applicantCVFileUrl: string | undefined;
  applicantCoverLetterFileUrl: string | undefined;
  applicantCVFileName: string | undefined;
  applicantCoverLetterFileName: string | undefined;
  nextOfKinFirstName: string | undefined;
  nextOfKinLastName: string | undefined;
  nextOfKinPhone: string | undefined;
  nextOfKinOccupation: string | undefined;
  nextOfKinAddress: string | undefined;
  nextOfKinEmail: string | undefined;
  requiresSponsorship: boolean;
  preferredLocations:
    | {
        state: string;
        country: string;
      }[]
    | null;
  minimumSalaryExpectation: string | undefined;
  maximumSalaryExpectation: string | undefined;
  salaryCurrency: string | undefined;
  shouldReviewCV: boolean;
  shouldReviewCoverLetter: boolean;
  expectedWorkHoursPerDay: number | null;
  preferredWorkPeriods: string[] | null;
  expectedPaymentPlan: string[] | null;
  noticePeriodInWeeks: number | null;
  workSchedule: string[] | null;
  workTools: string[] | null;
  workSkills: string[] | null;
  roleSkills: string[] | null;
  skillApplicationEssay: string | undefined;
  workplaceChallengeResolutionEssay: string | undefined;
  workAndLifeBalanceEssay: string | undefined;
  selfMotivationEssay: string | undefined;
  remoteWorkCulturalAdaptationEssay: string | undefined;
  remoteWorkEthicsEssay: string | undefined;
  remoteWorkBenefitsEssay: string | undefined;
  remoteWorkStrategiesEssay: string | undefined;
  extraInformation: string | undefined;
  allergies: string[] | null;
};

export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface UserDetailsTypes {}

export type IProfile = {
  id: string;
  photoUrl: string;
  token?: string;
  email?: string;
  firstName: string | undefined;
  lastName: string | undefined;
  preferredRole: string | undefined;
  levelOfExpertise: string | undefined;
  yearsOfExperience: string | undefined;
  country: string | undefined;
  phoneNumber: string | undefined;
  cvFileUrl: string | undefined;
  linkedInUrl: string | undefined;
  about: string | undefined;
  portfolioUrl: string | undefined;
};

interface RoleDescription {
  content: string;
}

interface EmployerDetails {
  id: string;
  logoUrl: string;
  name: string;
  industry: string;
}

interface JobListing {
  id: string;
  campaignId: string;
  role: string;
  roleDescription: RoleDescription[];
  locationCity: string;
  locationCountry: string;
  employmentType: string;
  locationType: string;
  startDate: string;
  endDate: string;
  minimumSalaryOffer: number | null;
  maximumSalaryOffer: number | null;
  salaryCurrency: string;
  createdAt: string;
  employer: EmployerDetails;
}

interface JobListingsResponse {
  message: string;
  data: {
    data: {
      docs: JobListing[];
      previousPage: number | null;
      currentPage: number;
      nextPage: number | null;
      totalDocs: number;
      totalPages: number;
    };
  };
}

type PrivateCampaign = {
  id: string;
  title: string;
  description: string;
  level: string;
  role: string;
  startDate: string; // This should ideally be a Date type
  endDate: string; // This should ideally be a Date type
  createdAt: string; // This should ideally be a Date type
};

interface PrivateJobListings {
  campaign: PrivateCampaign;
  id: string;
  createdAt: string;
  employer: Employer;
}

interface JobListingsData {
  docs: PrivateJobListings[];
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalDocs: number;
  totalPages: number;
}

interface PrivateJobListingsResponse {
  message: string;
  data: {
    data: JobListingsData;
  };
}

interface JobDetails {
  id: string;
  campaignId: string;
  role: string;
  applicationUrl: string;
  roleDescription: RoleDescription[];
  responsibilities: Responsibility[];
  locationCity: string;
  locationCountry: string;
  employmentType: string;
  locationType: string;
  startDate: string; // Date format
  endDate: string; // Date format
  minimumSalaryOffer: number;
  maximumSalaryOffer: number;
  salaryCurrency: string;
  minimumYearsOfExperience: number;
  skills: string[];
  createdAt: string; // Date format
  employer: EmployerDetails;
}

interface RoleDescription {
  content: {
    content: string;
  }[];
}

interface Responsibility {
  content: {
    content: string;
  }[];
}

interface JobDetailsResponse {
  message: string;
  data: {
    data: JobDetails;
  };
}

interface QueryTypes {
  limit?: number;
  skip?: number;
  pageParam?: number;
  employerId?: string;
  level?: string;
  role?: string;
}

interface TalentApplication {
  id: string;
  status: "in progress" | "interviewing" | "passed" | "failed";
  createdAt: string;
  campaign: {
    id: string;
    role: string;
    startDate: string;
    endDate: string;
    visibility: string;
  };
  employer: {
    id: string;
    name: string;
    country: string;
    logoUrl: string;
  };
  ticket: string;
  type: string;
}

interface TalentApplicationsResponse {
  message: string;
  data: {
    data: {
      docs: TalentApplication[];
    };
    docs: TalentApplication[];
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
  prevOffset: number;
}

interface TalentApplicationStatistics {
  message: string;
  data: {
    data: {
      totalFailed: number;
      totalInProgress: number;
      totalInterviewing: number;
      totalPassed: number;
      totalApplications: number;
    };
  };
}

interface AssessmentQuestion {
  id?: string;
  text: { content: string }[];
  choices?: string[];
  imageUrls?: string[];
}

interface Employer {
  country: string;
  id: string;
  name: string;
  tagline: string;
  logoUrl: string;
}

interface Application {
  id: string;
}

interface Instruction {
  text: { content: string }[];
}

interface MultiChoiceAssessmentData {
  id: string;
  campaignId?: string;
  type: string;
  title: string;
  description: string;
  instructions: Instruction[{
    content: string;
  }];
  durationInMinutes: number;
  numberOfRetakes: number;
  promptsPerSitting: number;
  passingScorePercentage: number;
  application: Application;
  employer: Employer;
  prompts: AssessmentQuestion[];
}

interface MultiChoiceAssessmentResponse {
  message: string;
  data: {
    data: MultiChoiceAssessmentData;
  };
}

interface MultiChoicePayload {
  assessmentId: string;
  applicationId: string;
  instructionsPagePath: string;
  responses: { promptId: string; choiceIndex: number }[];
}
interface EssayPayload {
  assessmentId: string;
  applicationId: string;
  instructionsPagePath: string;
  responses: { promptId: string; answer: Instruction }[];
}
interface SpeechPayload {
  assessmentId: string;
  applicationId: string;
  instructionsPagePath: string;
  responses: { promptId: string; score: number }[];
}

interface AssessmentResult {
  score: number;
  didTalentPass: boolean;
}

interface Instruction {
  text: [
    {
      content: string;
    },
  ];
}

interface Prompt {
  id: string;
  text: { content: string }[];
}

interface Employer {
  id: string;
  name: string;
  tagline: string;
}

interface EssayCompositionData {
  id: string;
  type: string;
  title: string;
  description: string;
  instructions: Instruction;
  durationInMinutes: number;
  numberOfRetakes: number;
  promptsPerSitting: number;
  passingScorePercentage: number;
  application: {
    id: string;
  };
  employer: Employer;
  prompts: Prompt[];
}

interface EssayCompositionResponse {
  message: string;
  data: {
    data: EssayCompositionData;
  };
}

interface ContinueApplicationTypes {
  message: string;
  data: {
    data: {
      nextAssessment: {
        ticket: string;
        title: string;
        type: string;
      };
    };
  };
}

interface PaymentsQueryTypes {
  limit?: number;
  skip?: number;
}

type TransactionDocument = {
  itemId: string;
  item: string;
  provider: string;
  price: number;
  transactionId: string;
  createdAt: string;
};

interface PaymentsResponse {
  message: string;
  data: {
    docs: TransactionDocument[];
    previousPage: number | null;
    currentPage: number;
    nextPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
}

interface State {
  name: string;
  state_code: string;
}

interface Country {
  name: string;
  iso3: string;
  states: State[];
}

interface ApiResponse {
  error: boolean;
  msg: string;
  data: {
    data: Country[];
  };
}

interface CountryData {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
}

interface CountryAndCapitalResponseData {
  error: boolean;
  msg: string;
  data: {
    data: CountryData[];
  };
}
interface ICountryCities {
  data: {
    data: {
      city: string;
      country: string;
    };
  };
}
