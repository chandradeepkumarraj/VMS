# VendorHire - Hybrid Recruitment Platform

![VendorHire Logo](./docs/logo.png)

> **Fast-track hiring at scale.** Connect companies with pre-vetted recruiting agencies in real-time.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green.svg)](https://www.mongodb.com/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/your-org/vendorhire)

---

## 🎯 Overview

**VendorHire** is a hybrid recruitment platform combining the scalability of modern job portals (like Naukri.com) with intelligent vendor management capabilities. We solve urgent hiring challenges by connecting:

- **Companies:** Post vacancies anonymously and receive pre-screened candidates from specialized agencies
- **Recruiting Agencies:** Discover matching job opportunities and submit qualified candidates
- **Platform:** Intelligent mediator with real-time collaboration, transparent metrics, and automated payments

### Why VendorHire?

| Challenge | VendorHire Solution |
|-----------|-------------------|
| Urgent hiring needs | Direct access to pre-vetted agencies with rapid sourcing |
| Agency coordination friction | Centralized platform with real-time messaging & tracking |
| Quality uncertainty | Transparent ratings, reviews, and performance metrics |
| Manual payment processing | Automated commission calculation and fund transfers |
| Lack of analytics | Real-time dashboards for all stakeholders |

---

## 🚀 Key Features

### For Companies
- ✅ **Anonymous Job Posting** - Hide company identity until placement
- ✅ **Smart Agency Matching** - Automatic routing to relevant agencies based on skills/location
- ✅ **Candidate Dashboard** - Compare, rate, and manage all submissions in one place
- ✅ **Real-time Chat** - Direct communication with agencies for quick resolution
- ✅ **Performance Analytics** - Track time-to-fill, cost-per-hire, and hiring metrics
- ✅ **Integrated Interviews** - Schedule and track interview progress

### For Recruiting Agencies
- ✅ **Job Opportunities Feed** - Discover relevant job postings matching your specialization
- ✅ **Smart Notifications** - Real-time alerts for high-priority opportunities
- ✅ **Candidate Submission** - Upload and track candidate submissions with status updates
- ✅ **Performance Dashboard** - View success rates, client ratings, and earning potential
- ✅ **Secure Messaging** - Communicate directly with clients for feedback

### For Platform Admin
- ✅ **User Management** - Approve/reject companies and agencies with KYC verification
- ✅ **Quality Assurance** - Monitor complaints, investigate disputes, manage ratings
- ✅ **Financial Dashboard** - Track commissions, subscriptions, and payouts
- ✅ **Platform Analytics** - Real-time KPIs, system health, and user engagement metrics
- ✅ **Compliance & Audit** - Full audit trails and regulatory compliance reports

---

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI** for responsive design
- **Socket.io-client** for real-time messaging
- **Axios** for API communication

### Backend
- **Node.js + Express.js**
- **MongoDB** with Mongoose ODM
- **Redis** for caching and sessions
- **Elasticsearch** for advanced search
- **Stripe** for payment processing
- **Socket.io** for real-time features
- **Jest** for unit testing

### Infrastructure
- **AWS (EC2, RDS, S3, Lambda)**
- **Docker** for containerization
- **Kubernetes** for orchestration
- **GitHub Actions** for CI/CD
- **Datadog** for monitoring
- **Sentry** for error tracking

### Database
```
MongoDB Collections:
├── Users (authentication, profiles)
├── Companies (client details, subscriptions)
├── Agencies (vendor details, KYC, ratings)
├── Vacancies (job postings, requirements)
├── Candidates (candidate profiles, resumes)
├── Submissions (candidate-job matching)
├── Ratings & Reviews
└── Payments (commissions, transactions)
```

---

## 📋 Project Structure

```
vendorhire/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Company/
│   │   │   ├── Agency/
│   │   │   ├── Admin/
│   │   │   └── Common/
│   │   ├── services/
│   │   ├── store/ (Redux)
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   └── DEPLOYMENT.md
│
├── docker-compose.yml
├── .github/workflows/
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 4.4
- Redis >= 6.0
- Docker & Docker Compose (optional)
- Git

### Installation with Docker (Recommended)

1. **Clone Repository**
```bash
git clone https://github.com/your-org/vendorhire.git
cd vendorhire
```

2. **Set Environment Variables**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. **Start Services**
```bash
docker-compose up -d
```

4. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

### Manual Installation

**Backend Setup**
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start server
npm run dev
```

**Frontend Setup**
```bash
cd frontend
npm install

# Configure environment variables
cp .env.example .env
# Update API endpoint to http://localhost:5000

# Start development server
npm start
```

---

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/v1/auth/register          - User registration
POST   /api/v1/auth/login             - User login
POST   /api/v1/auth/refresh           - Refresh JWT token
POST   /api/v1/auth/logout            - User logout
```

### Job Management Endpoints
```
POST   /api/v1/jobs                   - Create job posting
GET    /api/v1/jobs                   - Get all jobs with filters
GET    /api/v1/jobs/:jobId            - Get job details
PUT    /api/v1/jobs/:jobId            - Update job posting
DELETE /api/v1/jobs/:jobId            - Close job posting
GET    /api/v1/jobs/:jobId/submissions - Get submissions for job
```

### Agency Management Endpoints
```
POST   /api/v1/agencies/register      - Agency registration
GET    /api/v1/agencies/:agencyId     - Get agency details
PUT    /api/v1/agencies/:agencyId/kyc - Submit KYC documents
POST   /api/v1/agencies/:agencyId/submit-candidate - Submit candidate
GET    /api/v1/agencies/:agencyId/submissions - Get agency submissions
```

### Submission Endpoints
```
POST   /api/v1/submissions            - Create submission
GET    /api/v1/submissions            - Get submissions
PUT    /api/v1/submissions/:id/status - Update submission status
PUT    /api/v1/submissions/:id/rate   - Rate submission
```

**Full API Documentation:** [See API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

---

## 🔐 Security

### Authentication & Authorization
- JWT-based token authentication
- Role-Based Access Control (RBAC)
- Two-Factor Authentication (2FA) support
- Refresh token rotation

### Data Protection
- End-to-end encryption for sensitive data
- SSL/TLS for data in transit
- AES-256 encryption at rest
- PCI DSS compliance for payments
- GDPR compliance for user data

### Fraud Prevention
- KYC verification for all agencies
- Document verification (GST, PAN, registration)
- Anomaly detection for transactions
- Rate limiting and DDoS protection

---

## 🧪 Testing

### Unit Tests
```bash
cd backend
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
cd frontend
npm run test:e2e
```

### Code Coverage
```bash
npm run test:coverage
```

---

## 📊 Deployment

### Production Deployment
```bash
# Build Docker images
docker build -t vendorhire-backend:latest ./backend
docker build -t vendorhire-frontend:latest ./frontend

# Deploy to AWS ECS/EKS
./scripts/deploy-production.sh
```

### Environment-Specific Configuration
- **Development:** `docker-compose.yml`
- **Staging:** AWS EC2 instances with GitHub Actions
- **Production:** Kubernetes cluster on AWS EKS

**See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.**

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork Repository**
```bash
git clone https://github.com/your-org/vendorhire.git
cd vendorhire
```

2. **Create Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```

3. **Commit Changes**
```bash
git commit -m 'Add some AmazingFeature'
```

4. **Push to Branch**
```bash
git push origin feature/AmazingFeature
```

5. **Open Pull Request**

### Code Standards
- Follow ESLint configuration
- Maintain 80%+ test coverage
- Write clear commit messages
- Update documentation for new features

---

## 📈 Roadmap

### Phase 1: MVP (Weeks 1-10) ✅
- [x] Core job posting workflow
- [x] Agency onboarding and KYC
- [x] Candidate submission system
- [x] Basic messaging
- [x] Admin panel

### Phase 2: Enhancement (Weeks 11-20) 🚧
- [ ] Advanced search with Elasticsearch
- [ ] Rating & review system
- [ ] Analytics dashboards
- [ ] Payment integration
- [ ] Performance optimization

### Phase 3: Growth (Weeks 21-30) 📅
- [ ] Mobile app (iOS/Android)
- [ ] AI-powered candidate matching
- [ ] Multi-language support
- [ ] Video interview integration
- [ ] Blockchain credential verification

### Phase 4: Scale (Weeks 31+) 📋
- [ ] Microservices architecture
- [ ] Advanced analytics and reporting
- [ ] API marketplace
- [ ] Machine learning recommendations
- [ ] Global expansion

---

## 💰 Monetization Model

| Revenue Stream | Target | Notes |
|---|---|---|
| **Subscriptions** | 35% | Tiered plans: Starter ($99), Pro ($299), Enterprise (custom) |
| **Featured Listings** | 25% | Priority job placement ($50-$300) |
| **Commission** | 30% | 10-15% on successful placements |
| **Premium Services** | 10% | Resume DB, AI matching, assessments |

**Revenue Projections:**
- Year 1: $2.5M (MVP + beta growth)
- Year 2: $7.5M (national expansion)
- Year 3: $15M+ (enterprise scale)

---

## 📞 Support & Communication

### Issue Reporting
- **Bugs:** [GitHub Issues](https://github.com/your-org/vendorhire/issues)
- **Security:** security@vendorhire.com
- **General Help:** support@vendorhire.com

### Community
- **Slack Channel:** [Join our community](https://join.slack.com/...)
- **Twitter:** [@VendorHire](https://twitter.com/vendorhire)
- **LinkedIn:** [Company Page](https://linkedin.com/company/vendorhire)

### Documentation
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

| Role | Name | LinkedIn |
|------|------|----------|
| **Founder & CTO** | [Your Name] | [Profile] |
| **Co-Founder** | [Your Name] | [Profile] |
| **Product Lead** | [Your Name] | [Profile] |

---

## 🎉 Acknowledgments

- Built with ❤️ using MERN Stack
- Thanks to all contributors and supporters
- Inspired by Naukri.com, LinkedIn Jobs, and Toptal

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/badge/stars-1.2k-blue.svg)
![GitHub Forks](https://img.shields.io/badge/forks-450-blue.svg)
![GitHub Issues](https://img.shields.io/badge/issues-23-orange.svg)
![Contributors](https://img.shields.io/badge/contributors-12-green.svg)

---

**VendorHire - Making recruitment faster, smarter, and more transparent.**

**[Visit Website](https://vendorhire.com)** • **[Sign Up](https://app.vendorhire.com)** • **[Documentation](./docs)**