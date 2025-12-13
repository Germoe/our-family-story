import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Import default images
import partner1Image from '@/assets/partner1.jpg';
import partner2Image from '@/assets/partner2.jpg';
import gallery1Image from '@/assets/gallery-1.jpg';
import gallery2Image from '@/assets/gallery-2.jpg';
import gallery3Image from '@/assets/gallery-3.jpg';

export interface ProfileData {
  hero: {
    title: string;
    subtitle: string;
    videoUrl: string;
  };
  aboutUs: {
    title: string;
    intro: string;
    partner1: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
    partner2: {
      name: string;
      role: string;
      bio: string;
      image: string;
    };
  };
  timeline: {
    title: string;
    events: Array<{
      id: string;
      year: string;
      title: string;
      description: string;
    }>;
  };
  gallery: {
    title: string;
    subtitle: string;
    images: Array<{
      id: string;
      url: string;
      caption: string;
    }>;
  };
  promise: {
    title: string;
    letter: string;
    signature: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
  };
}

const defaultData: ProfileData = {
  hero: {
    title: "Welcome to Our Family",
    subtitle: "We're Alex & Jordan, and we can't wait to share our story with you",
    videoUrl: "",
  },
  aboutUs: {
    title: "Meet Us",
    intro: "We're a loving couple who have been together for 8 wonderful years. Our home is filled with laughter, love, and the occasional chaos of our rescue dog, Maple. We believe that family is built on unconditional love, and we're so excited to grow ours through adoption.",
    partner1: {
      name: "Alex",
      role: "Teacher & Creative Soul",
      bio: "I'm a third-grade teacher who finds joy in watching children discover the world around them. When I'm not in the classroom, you'll find me in the kitchen experimenting with new recipes or tending to our little garden. I believe every child deserves to feel safe, loved, and encouraged to dream big.",
      image: partner1Image,
    },
    partner2: {
      name: "Jordan",
      role: "Architect & Nature Lover",
      bio: "I design spaces that bring people together, but my favorite place is our home with Alex. I love hiking, stargazing, and building elaborate blanket forts. I can't wait to share these adventures with a child and watch them discover their own passions.",
      image: partner2Image,
    },
  },
  timeline: {
    title: "Our Journey Together",
    events: [
      {
        id: "1",
        year: "2016",
        title: "When We Met",
        description: "We met at a friend's birthday party and instantly connected over our shared love of terrible puns and good coffee.",
      },
      {
        id: "2",
        year: "2018",
        title: "Moving In Together",
        description: "We found our cozy home with a big backyard, perfect for summer barbecues and future adventures.",
      },
      {
        id: "3",
        year: "2020",
        title: "Maple Joins the Family",
        description: "We adopted Maple, our goofy golden retriever mix, who taught us even more about unconditional love.",
      },
      {
        id: "4",
        year: "2022",
        title: "Getting Married",
        description: "We said 'I do' surrounded by our closest friends and family on a beautiful autumn day.",
      },
      {
        id: "5",
        year: "2024",
        title: "Beginning Our Adoption Journey",
        description: "After years of dreaming, we officially began our adoption journey to grow our family.",
      },
    ],
  },
  gallery: {
    title: "Glimpses of Our Life",
    subtitle: "Moments that make our hearts full",
    images: [
      { id: "1", url: gallery1Image, caption: "Our cozy living room" },
      { id: "2", url: gallery2Image, caption: "Adventures with Maple" },
      { id: "3", url: gallery3Image, caption: "Family gatherings" },
    ],
  },
  promise: {
    title: "Our Promise to You",
    letter: `Dear Birth Mother,

We can only imagine the courage it takes to make this decision, and we want you to know how deeply we respect you. Your strength and love inspire us.

If you choose us to parent your child, we promise to:

• Love your child unconditionally, celebrating who they are every single day
• Create a home filled with laughter, learning, and endless support
• Honor your place in our child's story and keep your memory alive
• Provide opportunities for growth, creativity, and exploration
• Build a community of love around your child with our supportive families and friends
• Always be honest with your child about their adoption story

We dream of bedtime stories, first days of school, skinned knees that need kissing, and all the beautiful, messy moments of parenthood. We're ready to give a child everything we have to offer.

Thank you for considering us. Whatever you decide, we wish you peace and happiness.`,
    signature: "With love and hope, Alex & Jordan",
  },
  contact: {
    title: "Let's Connect",
    subtitle: "We'd love to hear from you and answer any questions you might have",
    email: "alex.jordan.family@email.com",
    phone: "(555) 123-4567",
  },
};

interface AdminContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  data: ProfileData;
  updateData: (path: string, value: any) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('adoptionProfileData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const toggleAdmin = useCallback(() => {
    setIsAdmin(prev => !prev);
  }, []);

  const updateData = useCallback((path: string, value: any) => {
    setData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(current[keys[i]])) {
          current[keys[i]] = [...current[keys[i]]];
        } else {
          current[keys[i]] = { ...current[keys[i]] };
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      localStorage.setItem('adoptionProfileData', JSON.stringify(newData));
      return newData;
    });
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, toggleAdmin, data, updateData }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
