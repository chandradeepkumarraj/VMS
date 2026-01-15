# VMS System Flowcharts

Based on the `VMS_Complete_Flowchart_Manual.pdf`, here are the Mermaid diagrams representing the system flows and working.

## 1. System-Level Platform Ecosystem

```mermaid
graph TD
    subgraph Ecosystem ["VENDORHIRE PLATFORM ECOSYSTEM"]
        Companies["COMPANIES (CLIENTS)"]
        Platform["VENDORHIRE VMS PLATFORM"]
        Agencies["RECRUITING AGENCIES (VENDORS)"]
        
        Companies <--> Platform
        Platform <--> Agencies
        
        subgraph CompanyActions ["Company Actions"]
            CA1[Post Jobs]
            CA2[Review Candidates]
            CA3[Schedule Interviews]
            CA4[Accept/Reject]
            CA5[Rate Agencies]
            CA6[Pay Commissions]
        end
        
        subgraph PlatformServices ["Platform Services"]
            PS1[Matching Engine]
            PS2[Messaging Service]
            PS3[Payment Processing]
            PS4[Analytics & Reports]
            PS5[KYC Verification]
            PS6[Compliance]
        end
        
        subgraph AgencyActions ["Agency Actions"]
            AA1[Register]
            AA2[Browse Jobs]
            AA3[Submit Candidates]
            AA4[Track Performance]
            AA5[View Ratings]
            AA6[Receive Payments]
        end

        Companies --- CompanyActions
        Platform --- PlatformServices
        Agencies --- AgencyActions
        
        Platform --- AdminPanel
    end

    subgraph AdminPanel ["ADMIN/PLATFORM PANEL"]
        AP1[User Management]
        AP2[Financial Dashboard]
        AP3[Analytics & Monitoring]
        AP4[Quality Assurance]
        AP5[Compliance & Audit]
    end
```

## 2. Complete Platform Process Flow (End-to-End Recruitment Lifecycle)

### Phase 1: Initialization (Registration & Verification)

```mermaid
flowchart TD
    subgraph P1 ["PHASE 1: INITIALIZATION"]
        Start([Start]) --> Reg[Registration]
        Reg --> Ver[Verification]
        
        subgraph VerificationProcess
            KYC1[KYC Check]
            KYC2[Document Verification]
        end
        
        Ver --> VerificationProcess
        VerificationProcess --> Approved{Approved?}
        Approved --Yes--> Ready[Ready to Use Platform]
        Approved --No--> Reject[Reject/Request More Info]
        
        Ready --> CompanyReady[Company Profile Active]
        Ready --> AgencyReady[Agency Profile Active]
    end
```

### Phase 2: Job Posting & Agency Matching

```mermaid
flowchart TD
    subgraph P2 ["PHASE 2: JOB POSTING & AGENCY MATCHING"]
        Company[Company] -->|Posts Job| JobForm
        
        subgraph JobDetails
            J1[Job Title]
            J2[Description]
            J3[Skills Required]
            J4[Salary Range]
            J5[Location]
            J6[Urgency Level]
            J7[Anonymous?]
        end
        
        JobForm --> JobDetails
        JobDetails --> Valid{Valid Input?}
        Valid --No--> Error[Error -> Retry]
        Valid --Yes--> Matching[Intelligent Agency Matching]
        
        subgraph Algorithm ["Matching Algorithm Considers"]
            A1[Agency Specialization]
            A2[Geographic Coverage]
            A3[Historical Success Rate]
            A4[Current Capacity]
            A5[Urgency Level]
            A6[Agency Performance Rating]
        end
        
        Matching --> Algorithm
        Algorithm --> Select[Select Top 5-10 Matching Agencies]
        Select --> Notify[Send Real-Time Notifications to Agencies]
        Notify --> Channels[In-App, Email, SMS]
        Channels --> AgenciesNotified[Job Posted & Agencies Notified]
    end
```

### Phase 3: Agency Job Discovery & Candidate Sourcing

```mermaid
flowchart TD
    subgraph P3 ["PHASE 3: AGENCY ACTIONS(Agency Job Discovery & Candidate Sourcing)"]
        Notify[Agency Receives Notification] --> Review[Review Job Details]
        Review --> Relevant{Job Relevant?}
        Relevant --No--> Skip[Skip / Mark Not Interested]
        Relevant --Yes--> Bid[Decide to Bid/Accept]
        
        Bid --> Accept[Accept Job Assignment]
        Accept --> StatusAssign[Status: ASSIGNED_TO_AGENCY]
        
        StatusAssign --> Source[Source Candidates]
        
        subgraph SourcingChannels ["Sources"]
            S1[Own Talent Pool]
            S2[LinkedIn/Job Boards]
            S3[Referrals]
            S4[Network]
        end
        
        Source --> SourcingChannels
        SourcingChannels --> Validate[Validate Candidates]
        
        subgraph Validation ["Validation Criteria"]
            V1[Skills Match]
            V2[Experience Level]
            V3[Salary Expectation]
            V4[Availability]
            V5[Profile Quality]
        end
        
        Validate --> Validation
        Validation --> Upload[Upload Qualified Candidates]
        
        subgraph SubmissionData ["Submission Data"]
            SD1[Resume/CV]
            SD2[Contact Details]
            SD3[Skills Profile]
            SD4[Experience Summary]
            SD5[Agency Remarks]
            SD6[Requested Salary]
        end
        
        Upload --> SubmissionData
        SubmissionData --> Submitted[Submission Created & Company Notified]
    end
```

### Phase 4: Candidate Review & Selection

```mermaid
flowchart TD
    subgraph P4 ["PHASE 4: Candidate Review & Selection"]
        CompNotify[Company Receives Notification] --> CompReview[Company Reviews Submissions]
        
        subgraph DashboardView
            D1[All Candidates]
            D2[Agency Remarks]
            D3[Candidate Profiles]
            D4[Resume Download]
            D5[Side-by-side Comparison]
        end
        
        CompReview --> DashboardView
        CompReview --> Rate[Rate Candidates 1-5 Stars]
        
        Rate --> Decision{Decision Point}
        
        Decision -->|Shortlist| Shortlisted[Update Status: SHORTLISTED]
        Decision -->|Interview| Interview[Update Status: INTERVIEWED]
        Decision -->|Reject| Rejected[Update Status: REJECTED]
        Decision -->|Consider| Consider[Update Status: CONSIDER]
        
        Shortlisted & Interview & Rejected & Consider --> Feedback[Send Feedback to Agencies & Update Metrics]
    end
```

### Phase 5 & 6: Interview, Offer & Placement

```mermaid
flowchart TD
    subgraph P5P6 ["PHASE 5 & 6: Interview, Offer & Placement"]
        Schedule[Company Schedules Interviews] --> Conduct[Interviews Conducted]
        Conduct --> IntDecision{Interview Decision}
        
        IntDecision --Offer--> MakeOffer[Extend Offer]
        IntDecision --Second Round--> SecondRound[Second Round Interview]
        IntDecision --Reject--> IntReject[Reject Status]
        
        SecondRound --> IntDecision
        
        MakeOffer --> PlatformNotify[Platform Notifies Candidate & Agency]
        PlatformNotify --> CandResponse{Candidate Acceptance?}
        
        CandResponse --Accept--> Negotiate{Negotiate?}
        CandResponse --Reject--> OfferReject[Offer Rejected]
        
        Negotiate --Yes--> Renegotiate[Negotiation Phase]
        Negotiate --No--> Accepted[Offer Accepted]
        Renegotiate --> CandResponse
        
        Accepted --> Placement[Placement Confirmed]
    end
```

### Phase 7: Payment & Commission

```mermaid
flowchart TD
    subgraph P7 ["PHASE 7: Payment & Commission"]
        PlaceConf[Placement Confirmed & Accepted] --> Calc[Platform Calculates Commission]
        
        subgraph Formula ["Commission Formula"]
            F1[Base: 10-15% of Salary]
            F2[Urgency Bonus: +2-3%]
            F3[Discount: High Performers]
            F4[Total Commission Amount]
        end
        
        Calc --> Formula
        Formula --> Invoice[Platform Generates Invoice]
        Invoice --> PayProcess[Payment Processed via Stripe]
        PayProcess --> AgencyPay[Agency Receives Payment]
        AgencyPay --> Complete[Transaction Complete]
    end
```

## 3. Company User Workflow (Detailed)

```mermaid
flowchart TD
    Start([Start]) --> NewUser{New Company User?}
    NewUser --Yes--> Register[Registration]
    NewUser --No--> Login[Login]
    
    Register --> KYC[KYC Submission]
    KYC --> Await[Await Approval 1-2 Days]
    Await --> Approved{Approved?}
    Approved --No--> ProvideDocs[Provide More Docs]
    ProvideDocs --> Await
    Approved --Yes--> Dashboard[Company Dashboard]
    Login --> Dashboard
    
    subgraph DashActions ["Dashboard Actions"]
        DA1[Active Jobs]
        DA2[Submissions]
        DA3[Messages]
        DA4[Analytics]
        DA5[Account Settings]
    end
    
    Dashboard --> DashActions
    
    subgraph MainMenu ["Main Menu Options"]
        Post[Post New Job]
        View[View All Jobs]
        Manage[Manage Submissions]
        Agencies[View & Manage Agencies]
    end
    
    Dashboard --> MainMenu
    
    Post --> FillForm[Fill Job Form] --> Publish[Publish Job]
    View --> SelectJob[Select Job] --> JobDetails[View Details] --> UpdateJob[Update/Edit Job]
    Manage --> Review[Review Candidates] --> Rate[Rate & Feedback] --> Status[Update Status]
    Agencies --> ViewRatings[View Ratings] --> SendMsg[Send Message] --> Chat[Chat & Feedback]
```

## 4. Recruiting Agency Workflow (Detailed)

```mermaid
flowchart TD
subgraph 4 ["Agency User Workflow (Detailed)"]
    Start([Start]) --> NewUser{New Agency User?}
    NewUser --Yes--> Register[Registration]
    NewUser --No--> Login[Login]
    
    Register --> Inputs[Email, Agency Info, GST/PAN, Specialization]
    Inputs --> KYC[KYC Submission]
    KYC --> AdminReview[Admin Reviews KYC]
    AdminReview --> Approved{Approved?}
    Approved --No--> Revise[Revise Documents]
    Revise --> KYC
    Approved --Yes--> Active[Account Active]
    
    Active --> Dashboard[Agency Dashboard]
    Login --> Dashboard
    
    subgraph AgencyDash ["Agency Dashboard"]
        AD1[Available Jobs]
        AD2[My Submissions]
        AD3[Messages]
        AD4[Performance Metrics]
        AD5[Earnings]
    end
    
    Dashboard --> AgencyDash
    
    subgraph Menu ["Menu Options"]
        Browse[Browse Available Jobs]
        ViewSub[View My Submissions]
        ManageCli[Manage Clients]
        Track[Track Performance & Earnings]
    end
    
    Dashboard --> Menu
    
    Browse --> Filter[Apply Filters] --> Search[Search Jobs] --> Click[Click Job Card] --> Decide{Decide to Submit}
    Decide --Yes--> CreateSub[Create Submission] --> Submit[Submit to Client]
    Decide --No--> Skip
    
    ViewSub --> ViewAll[View All Submissions] --> TrackStatus[Track Status] --> ClickSub[Click Submission]
    
    ManageCli --> Msg[Send Message] --> RealTime[Real-time Chat]
    
    Track --> Metrics[View Metrics] --> Earnings[Earnings Tracker]
 end
```

## 5. Data Flow: Job Posting to Notification (Sequence)

```mermaid

sequenceDiagram
    participant C as Company
    participant API as Platform API
    participant DB as MongoDB
    participant Q as Redis Queue
    participant Notif as Notification Service
    participant A as Agency Dashboard

    C->>API: Job Details (Title, Skills, Salary...)
    API->>API: Validate Data
    API->>DB: Store Vacancy Document
    API->>API: Run Matching Algorithm (Select Agencies)
    API->>Q: Publish Job Notification Event
    Q->>Notif: Consume Job Notification Event
    Notif->>Notif: Create In-App Notification
    Notif->>Notif: Send Email/SMS
    Notif->>A: Update Dashboard ("New Job Match")

```

## 6. Data Flow: Candidate Submission (Sequence)

```mermaid
sequenceDiagram
    participant A as Agency
    participant API as Platform API
    participant S3 as AWS S3
    participant DB as MongoDB
    participant Q as Redis Queue
    participant Notif as Notification Service
    participant C as Company Dashboard

    A->>API: Candidate Submission (Profile, Resume)
    API->>API: Validate Upload
    API->>S3: Store Resume File
    API->>DB: Create Candidate & Submission Docs
    API->>DB: Update Vacancy Stats
    API->>Q: Publish Submission Event
    Q->>Notif: Consume Submission Event
    Notif->>C: Notify Company ("New Candidate Submitted")
    C->>C: Display New Submission Alert
```

## 7. Data Flow: Payment & Commission (Sequence)

```mermaid
sequenceDiagram
    participant Placement as Placement Confirmed
    participant Payment as Payment Service
    participant DB as Database
    participant Rating as Rating Service
    participant Stripe as Stripe Gateway
    participant Agency as Agency
    participant Company as Company

    Placement->>Payment: Trigger Payment Event
    Payment->>DB: Fetch Job, Agency, Candidate Details
    Payment->>Payment: Calculate Commission (Base + Urgency - Discount)
    Payment->>DB: Create Payment Record (PENDING)
    
    Placement->>Rating: Request Ratings
    Rating->>Company: Request Company Rating
    Rating->>Agency: Update Agency Profile (Success Rate++)
    
    Payment->>Stripe: Process Payment
    Stripe-->>Payment: Payment Success/Fail
    
    Payment->>DB: Update Payment Status (COMPLETED)
    Payment->>Agency: Notify "Payment Received"
    Payment->>Company: Notify "Placement Complete"
```
