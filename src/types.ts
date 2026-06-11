export interface WeddingPackage {
  id: string;
  name: string;
  tamilName: string;
  price: number;
  badge?: string;
  includesText?: string;
  features: string[];
  featuresTamil?: string[];
  whatsappMessage: string;
  isPopular?: boolean;
}

export interface StudioService {
  id: string;
  name: string;
  tamilName: string;
  description: string;
  descriptionTamil: string;
  iconName: string; // lucide icon name
}

export interface FunctionService {
  id: string;
  name: string;
  tamilName: string;
  image: string;
}

export interface FramePrice {
  size: string;
  price: number;
}

export interface BookingInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  matchedPackage?: string;
  budget?: string;
}

// -------------------------------------------------------------
// SEED DATA EXTRACTED FROM SCREENSHOTS & DESIGN BRAND SYSTEM
// -------------------------------------------------------------

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'pkg-1',
    name: 'Package 1 - Essential',
    tamilName: 'வழக்கமான தொகுப்பு 1',
    price: 50000,
    features: [
      'Photography & Videography Included',
      'Premium Outdoor & Indoor Shoot',
      'Premium Custom Album',
      'Full HD Video Delivered in Pendrive',
      'Bonus Items: Custom Calendar, Dual Frame & Custom Mug'
    ],
    featuresTamil: [
      'புகைப்படம் & வீடியோகிராபி உள்ளடக்கியது',
      'பிரீமியம் அவுட்டோர் மற்றும் இன்டோர் ஷூட்',
      'மின்னும் பிரீமியம் ஆல்பம்',
      'முழு HD வீடியோ பென்டிரைவில்',
      'கூடுதல் பரிசுகள்: தனிப்பயன் கேலெண்டர், பிரேம்கள் மற்றும் குவளை'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I am interested in Package 1 - Essential (₹50,000). Please provide more details and date availability.',
  },
  {
    id: 'pkg-2',
    name: 'Package 2 - Enhanced',
    tamilName: 'மேம்படுத்தப்பட்ட தொகுப்பு 2',
    price: 65000,
    badge: 'POPULAR',
    isPopular: true,
    includesText: 'Includes Everything in Package 1 +',
    features: [
      'Stunning Cinematic Drone Coverage',
      'Bespoke Crafted Photo Keychain'
    ],
    featuresTamil: [
      'பிரமாண்டமான ட்ரோன் கவரேஜ் (வான்வழி)',
      'அழகான தனிப்பயன் புகைப்பட சாவிக்கொத்து'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I am interested in Package 2 - Enhanced (₹65,000) with Drone Coverage. Please connect soon.',
  },
  {
    id: 'pkg-3',
    name: 'Package 3 - Candid Video',
    tamilName: 'கேண்டிட் வீடியோ தொகுப்பு 3',
    price: 80000,
    includesText: 'Includes Everything in Package 2 +',
    features: [
      'Additional Immersive Candid Videos',
      'Note: No candid photos included in this package'
    ],
    featuresTamil: [
      'கூடுதல் கேண்டிட் வீடியோக்கள்',
      'குறிப்பு: இந்த தொகுப்பில் கேண்டிட் புகைப்படங்கள் இல்லை'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I want to book Package 3 - Candid Video (₹80,000). Let me know the booking procedures.',
  },
  {
    id: 'pkg-4',
    name: 'Package 4 - Candid Pro',
    tamilName: 'கேண்டிட் புரோ தொகுப்பு 4',
    price: 115000,
    includesText: 'Includes Everything in Package 3 +',
    features: [
      'WITH SPARKLING CANDID PHOTOS INCLUDED',
      '2x Cinematic Candid Videos in Separate Pendrives',
      '2 Premium Albums & Additional Extra Merchandise'
    ],
    featuresTamil: [
      'முழுமையான கேண்டிட் புகைப்படங்கள்',
      'தனித்தனி பென்டிரைவ்களில் 2x கேண்டிட் வீடியோக்கள்',
      '2 பிரீமியம் ஆல்பங்கள் & கூடுதல் பிரத்யேக பரிசுகள்'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I am highly interested in Package 4 - Candid Pro (₹1,15,000) which has both Candid Photos & Videos. I would love to schedule a call.',
  },
  {
    id: 'pkg-5',
    name: 'Package 5 - Display Plus',
    tamilName: 'டிஸ்ப்ளே பிளஸ் தொகுப்பு 5',
    price: 135000,
    includesText: 'Includes Everything in Package 4 +',
    features: [
      'Large Immersive LED TV Display at Venue'
    ],
    featuresTamil: [
      'விழா மேடையில் அதிநவீன பெரிய LED TV டிஸ்ப்ளே'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I want to inquire about Package 5 - Display Plus (₹1,35,000). Please share album samples.',
  },
  {
    id: 'pkg-6',
    name: 'Package 6 - 360 Experience',
    tamilName: '360° அனுபவம் தொகுப்பு 6',
    price: 150000,
    includesText: 'Includes Everything in Package 5 +',
    features: [
      'Premium Interactive 360° Selfie Camera Setup'
    ],
    featuresTamil: [
      'அதிநவீன 360° செல்பி கேமரா அமைப்பு'
    ],
    whatsappMessage: 'Hi Muthu Digitals, Package 6 - 360 Experience (₹1,50,000) looks amazing. Can you explain the 360 camera space requirements?',
  },
  {
    id: 'pkg-7',
    name: 'Package 7 - Instant Memories',
    tamilName: 'உடனடி நினைவுகள் தொகுப்பு 7',
    price: 180000,
    includesText: 'Includes Everything in Package 6 +',
    features: [
      'Instant On-the-spot Photo Printing Setup for Guests'
    ],
    featuresTamil: [
      'விருந்தினர்களுக்கு மேடையில் உடனடி புகைப்பட பிரிண்டிங்'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I am interested in Package 7 - Instant Memories (₹1,80,000). Please let me know how many prints are included.',
  },
  {
    id: 'premium-az',
    name: 'Premium A-Z - The Ultimate Experience',
    tamilName: 'பிரீமியம் A-Z - முழுமையான பேரனுபவம்',
    price: 250000,
    badge: 'EXCLUSIVE',
    features: [
      'Complete A-Z Cinematic Photo & Video Coverage',
      'Ultimate Set of Premium High-End Albums & Custom Frames',
      'Drone Shoot & Bespoke Scenic Outdoor Shoot Included',
      'Professional High-Energy DJ & Special Ground Effects',
      'Complete End-to-End Elite Event Management'
    ],
    featuresTamil: [
      'முழுமையான புகைப்பட & வீடியோகிராபி கவரேஜ்',
      'பிரீமியம் ஆல்பங்கள் & வாடிக்கையாளர் பிரேம்கள்',
      'வான்வழி ட்ரோன் மற்றும் பிரத்யேக அவுட்டோர் ஷூட்',
      'பிரபல இசை மாஸ்டர் DJ மற்றும் சிறப்பு மேடை எஃபெக்ட்ஸ்',
      'முழுமையான மற்றும் உயர் ரக நிகழ்வு மேலாண்மை'
    ],
    whatsappMessage: 'Hi Muthu Digitals, I want to book your absolute best: Premium A-Z Package (₹2,50,000). Let us plan a meeting at your studio!',
  }
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'studio-1',
    name: 'Passport & Visa Photos',
    tamilName: 'பாஸ்போர்ட் & விசா போட்டோக்கள்',
    description: 'Precision-perfect identity photography meeting all international structural standards with instant delivery.',
    descriptionTamil: 'அனைத்து சர்வதேச தரத்திற்கும் பொருந்தக்கூடிய துல்லியமான விசா மற்றும் பாஸ்போர்ட் புகைப்படங்கள்.',
    iconName: 'contact-round'
  },
  {
    id: 'studio-2',
    name: 'Alliance & Portfolio',
    tamilName: 'திருமண தகவல் & போர்ட்ஃபோலியோ',
    description: 'Bespoke high-contrast portrait sessions designed to reflect your personality and character with exquisite elegance.',
    descriptionTamil: 'தனித்துவத்தை பறைசாற்றும் வகையிலான அதிநவீன அழகிய போர்ட்ஃபோலியோ புகைப்பட அமைப்பு.',
    iconName: 'sparkles'
  },
  {
    id: 'studio-3',
    name: 'Photo Restoration',
    tamilName: 'புகைப்பட மறுசீரமைப்பு (ஹெரிடேஜ்)',
    description: 'Reviving long-lost heritage memories, repairing ancient film cracks, with expert digital restoration and advanced color correction.',
    descriptionTamil: 'பழைய மற்றும் சேதமடைந்த புகைப்படங்களை டிஜிட்டல் முறையில் சரிசெய்து மெருகூட்டுதல்.',
    iconName: 'history'
  },
  {
    id: 'studio-4',
    name: 'Self Portraits',
    tamilName: 'சுய உருவப்படம்',
    description: 'Professional editorial portraits tailored for magazines, digital profiles, and custom corporate bios.',
    descriptionTamil: 'கார்ப்பரேட் மற்றும் சமூக ஊடகத் தேவைகளுக்கான நேர்த்தியான சுய உருவப்பட சேவை.',
    iconName: 'user'
  },
  {
    id: 'studio-5',
    name: 'Family Portraits',
    tamilName: 'உன்னத குடும்ப புகைப்படம்',
    description: 'Dynamic family groups and multi-generational heritage captures under custom theatrical lighting setups.',
    descriptionTamil: 'தலைமுறைகளை இணைக்கும் நேர்த்தியான ஸ்டுடியோ குடும்ப புகைப்படம்.',
    iconName: 'users'
  },
  {
    id: 'studio-6',
    name: 'Baby & Kids Studio',
    tamilName: 'குழந்தைகளின் குறும்பு உலகம்',
    description: 'Playful portraits of infants and toddlers captured with hyper-sensitive lights keeping the scene cheerful.',
    descriptionTamil: 'குழந்தைகளின் மென்மையான மற்றும் குறும்பு தருணங்களை பாதுகாப்பாக படம் பிடித்தல்.',
    iconName: 'smile'
  }
];

export const FUNCTION_SERVICES: FunctionService[] = [
  {
    id: 'func-1',
    name: 'Baby Shower & Naming',
    tamilName: 'வளைகாப்பு மற்றும் பெயர்சூட்டு விழா',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk1lo7Kas0sOQrG2w-e5TdAiAUW0AJAOasr1qjB1UicMjAp_Xz2iFvXdgvDIB_eYIWWBOHtsUW3Qed0YLEzN4-hP5ZAXqGN-8VOZxzCcyojBKQ3nwTW6XTev7bGtG6DOf4SGIO45Eo8mgJNroh5hoIteRW-co9JLvmLWufmT2GpsQvDQ0mjpmwoU01XzsCCUSmxtvQVziAUeeglHX3HUHQescjHVxQHHVyqkM7RWLPPe8Ts8ALB_lWGfhR6vJyHUUnKHQjEufXoAM'
  },
  {
    id: 'func-2',
    name: 'Ear Piercing Ceremony',
    tamilName: 'காது குத்துதல் விழா',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSarQktc2lGQhoZlzfjJdT-vunBdqBseDD7zcmfwEw7smgL2uu7gGpL1nxiLfNZi-69oxQHkyDTefklhureFSdK-BNFpGR6HALcJajymXSaJj2dpb632mMa17JhsGlU1ti43pJI9gcaK0rXglJT8pproLXo8Qj67BI3AWdqQGTrl-_23I4qjVSl654Khx2TojXVmLdkLcyGP0pqvu415U5ZV9nsXmwtm6Ns1Nb3K8SiaIKYnlV-Vc2UACa7X0riaRrxfzOZeBFXNk'
  },
  {
    id: 'func-3',
    name: 'Birthday Celebrations',
    tamilName: 'பிறந்தநாள் விழா',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd4Y6ukMIviLO61ab4sEjVRj6-yoRQ_5iGhUy_ePpT_3hPWQo4b-6F1nD_IlncPTjZcGkoetFScobeNLDjvIS9hH20BlPESTqnR4o3maARFcH0NMhjiOP8cWByKqr62XBqtaTA-VGHFCjYW4-r_-qWqpfIlE84r_a4ObHqqjcaSzJ7qqWndqaj3kFSF1tmBmq7ow47XlUyPh46WCSsr3aXGEr872Ti01jo1exAayCE7erLOaVkux0v1Lmykth5loqvsaI5sNu9nBI'
  },
  {
    id: 'func-4',
    name: 'Engagement Ceremony',
    tamilName: 'நிச்சயதார்த்த வைபவம்',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIvShmWIb1D_YiqVNwmtKTLA-JhNoEKrZZ-HS9m1JsbmGvANke9ZgkYde9UC6Ia2ejthV0031K1azsnQYnJsJXQWrsDVoCjBLeai8r3UrIAxb5YfpNX9Etv4Z7Ki7yFvnS5Elb6SqZtFQG9Wcz5IpluIhuZBUWPMTvx2uFoE_Lj2jWdyg5jO5JLolJx-3C_bnsVMa6Mr-BZEWQn0HudS7UuLJCa4zI7h7lsazFIZVCO6pSpWIecrQe4j6Xrlw2Y843iBgfIHmASzo'
  },
  {
    id: 'func-5',
    name: 'House Warming & Arangetram',
    tamilName: 'புதுமனை புகுவிழா / அரங்கேற்றம்',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNlGY160_nNagIcUt-M56xD1zGzhjgEG6GBAhO0A-d0UOXDxsNKd2rMMg0mgv4jGbtAllXPjQDcnau87q5URsE3tRWFdc9svnJcG8MABw-L49Enzjv7l5427-6rqOh2xH2YgJRk-fHGnrpIGHheIfAoO-RbDvcivDqSEbFsVFpcEeXHrxfTwVn7x4sS7Ri2RbzTFu7O_faHX8YzPQS7_5aKBEIuhVVO_9Gvndnl0U6pSLQc2n4qqn0FMBV4n2hYidpjR969C1ARso'
  },
  {
    id: 'func-6',
    name: 'Family Events & Stage Shows',
    tamilName: 'குடும்ப விழாக்கள் மற்றும் கலைநிகழ்ச்சிகள்',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsl0pMdPV-TvgEfVqZieVGc7FgBbK4ezJ0u387STwb7kuWYGre4A4Ibx-hNIsbs8P6_cfmJU8RZ3wzO2RoPXR1FYW2qTo9J2mS_AVxeaUUldqkcbEduPkV0xLn8TeuSgyI74SXWEaK2PYD-0AZxZB-xHPg4PAkGYrNWIdkQ5baJd7IxjEVQyyeCiYxVhNh724fq-8ZkmW0KQJv8NDOLPc5Rt_hBG8KMleKtR5JX7wjDr8E-JzJj6wa3IFHZxMeGPiO4qz2mpauRo'
  }
];

export const PREMIUM_FRAMES_PRICES: FramePrice[] = [
  { size: '6" x 4" Frame', price: 250 },
  { size: '8" x 6" Frame', price: 400 },
  { size: '10" x 8" Frame', price: 500 },
  { size: '12" x 8" Frame', price: 600 },
  { size: '12" x 10" Frame', price: 800 },
  { size: '15" x 10" Frame', price: 1000 },
  { size: '15" x 12" Frame', price: 1200 },
  { size: '18" x 12" Frame', price: 1500 },
  { size: '20" x 16" Frame', price: 2500 },
  { size: '20" x 24" Frame', price: 3200 },
  { size: '24" x 28" Frame', price: 3800 },
  { size: '30" x 20" Frame', price: 4200 },
  { size: '40" x 24" Frame', price: 4800 },
  { size: '24" x 8" Frame', price: 1500 },
  { size: '30" x 10" Frame', price: 2000 }
];
