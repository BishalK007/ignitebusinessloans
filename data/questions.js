export const questions = [
  // Basic Info Part of the Navbar
  {
    id: "startTime",
    title: "When did you start your business?",
    options: [
      "0 - 5 Months",
      "6 - 12 Months",
      "1 - 2 Years",
      "2 - 5 Years",
      "5 - 10 Years",
      "10+ Years",
    ],
  },
  {
    id: "businessType",
    title: "What type of business do you own?",
    options: [
      "C Corporation",
      "Partnership",
      "Limited Liability Company | LLC",
      "S Corporation",
      "Sole Proprietorship",
    ],
  },
  {
    id: "needFunding",
    title: "How much do you need?",
    p: "If you are not sure how much you need, select the highest amount you are considering.",
    options: [
      "$10,000",
      "$20,000",
      "$50,000",
      "$100,000",
      "$250,000",
      "$500,000",
      "$1,000,000",
      "$2,000,000",
      "$3,000,000",
    ],
  },
  {
    id: "fundUsage",
    title: "What are you seeking funding for?",
    options: [
      "Expansion",
      "Equipment purchase",
      "Inventory",
      "Working capital/Cash Flow",
      "Other",
    ],
  },
  {
    id: "annualRevenue",
    title: "What is your annual revenue?",
    p: "If you aren't sure of the exact number, your best guess is fine!",
    inputType: "number",
    validation: "positiveNumber",
    nextButton: true,
  },
  {
    id: "creditScore",
    title: "What is your personal credit score?",
    options: [
      "Excellent (720+)",
      "Good (680 - 719)",
      "Fair (640 - 679)",
      "Poor (639 or less)",
    ],
  },

  // Your Business Part of the Navbar
  {
    id: "industryName",
    title: "What industry are you in?",
    options: [
      "Construction",
      "Transportation and Warehousing",
      "Retail Trade",
      "Healthcare",
      "Accommodation and Food Services",
      "Other",
    ],
  },
  {
    id: "ZipCode",
    title: "What is your business zip code?",
    inputType: "number",
    validation: "usZipCode",
    placeholder: "29402",
    nextButton: true,
  },
  {
    id: "BusinessName",
    title: "What is your business name?",
    inputType: "text",
    placeholder: "Example Corp",
    nextButton: true,
  },

  // Your Info Part of the Navbar
  {
    id: "fullName",
    title: "What is your name?",
    p: "Please enter both your first and last name.",
    inputType: "fullName",
    nextButton: true,
  },
  {
    id: "phoneNumber",
    title: "What is the best phone number to reach you?",
    inputType: "tel",
    validation: "usPhoneNumber",
    placeholder: "(222) 222-2222",
    nextButton: true,
  },
  {
    id: "email",
    title: "What is your email address?",
    inputType: "email",
    validation: "usEmail",
    placeholder: "example@gmail.com",
    nextButton: true,
  },
];
