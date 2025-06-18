export interface OfferInfo {
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  link: {
    url: string;
    text: string;
    icon: string;
    border?: boolean;
    role: string;
  };
  icon: {
    url: string;
    alt: string;
    bg: string;
  };
  description: string;
}

export const offerInfo: OfferInfo[] = [
  {
    image: {
      url: "/image/sell_hmo.png",
      alt: "sell hmo",
      width: 359.42,
      height: 81.54,
    },
    link: {
      url: "/",
      text: "Sell HMO",
      icon: "/icons/chevron_right.svg",
      border: true,
      role: "link",
    },
    icon: {
      url: "/icons/heart_pulse.svg",
      alt: "heart pulse",
      bg: "#E7FAE3",
    },
    description: "Provide access to affordable and cheap health insurance.",
  },
  {
    image: {
      url: "/image/give_loans.png",
      alt: "give loans",
      width: 288,
      height: 157.79,
    },
    link: {
      url: "/",
      text: "Give Loans",
      icon: "/icons/chevron_right.svg",
      border: true,
      role: "link",
    },
    icon: {
      url: "/icons/hand_money.svg",
      bg: "#E6EDFD",
      alt: "hand money",
    },
    description: "Create wealth for the unbanked and banked alike.",
  },
  {
    image: {
      url: "/image/creat_remittance.png",
      alt: "create remittance",
      width: 257,
      height: 157,
    },
    link: {
      url: "/",
      text: "Create Remittance",
      icon: "/icons/chevron_right.svg",
      border: true,
      role: "link",
    },
    icon: {
      url: "/icons/document_medicine.svg",
      bg: "#FBDFC6",
      alt: "document-medicine",
    },
    description: "Create wealth for the unbanked and banked alike.",
  },
];
