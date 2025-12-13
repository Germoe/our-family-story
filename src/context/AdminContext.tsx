import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Import default images
import partner1Image from '@/assets/partner1.jpg';
import partner2Image from '@/assets/partner2.jpg';
import gallery1Image from '@/assets/gallery-1.jpg';
import gallery2Image from '@/assets/gallery-2.jpg';
import gallery3Image from '@/assets/gallery-3.jpg';
import homeExteriorImage from '@/assets/home-exterior.jpg';
import neighborhoodParkImage from '@/assets/neighborhood-park.jpg';
import grandparentsImage from '@/assets/grandparents.jpg';
import friendsGatheringImage from '@/assets/friends-gathering.jpg';
import hikingAdventureImage from '@/assets/hiking-adventure.jpg';
import cookingTogetherImage from '@/assets/cooking-together.jpg';

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
  home: {
    title: string;
    subtitle: string;
    description: string;
    homeImage: string;
    neighborhoodImage: string;
    features: Array<{
      id: string;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  familyFriends: {
    title: string;
    subtitle: string;
    description: string;
    members: Array<{
      id: string;
      name: string;
      relationship: string;
      description: string;
      image: string;
    }>;
  };
  ourLife: {
    title: string;
    subtitle: string;
    description: string;
    activities: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
    }>;
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
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
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
      role: "Engineer & Adventurer",
      bio: "I'm a civil engineer who loves problem-solving and building things—from bridges at work to treehouses in our backyard. I balance my technical side with a creative streak for woodworking and a love for exploring new hiking trails.",
      image: partner2Image,
    },
  },
  home: {
    title: "Our Home & Neighborhood",
    subtitle: "Where love lives and memories are made",
    description: "Our cozy four-bedroom home sits on a tree-lined street in a welcoming neighborhood. We have a big backyard perfect for playing, a sunny kitchen where we love to cook together, and a dedicated playroom ready for a child's imagination. The neighborhood is full of families, and there's always someone to wave hello to on our evening walks.",
    homeImage: homeExteriorImage,
    neighborhoodImage: neighborhoodParkImage,
    features: [
      {
        id: "1",
        icon: "Home",
        title: "Cozy Family Home",
        description: "4 bedrooms, a big backyard, and a room waiting for a child to make their own.",
      },
      {
        id: "2",
        icon: "Trees",
        title: "Great Parks Nearby",
        description: "Walking distance to 3 parks with playgrounds, trails, and a community garden.",
      },
      {
        id: "3",
        icon: "GraduationCap",
        title: "Excellent Schools",
        description: "Top-rated elementary school just 5 minutes away with wonderful teachers.",
      },
      {
        id: "4",
        icon: "Users",
        title: "Friendly Community",
        description: "Active neighborhood with block parties, holiday celebrations, and caring neighbors.",
      },
    ],
  },
  familyFriends: {
    title: "Our Village of Love",
    subtitle: "The amazing people who will be part of your child's life",
    description: "We're blessed with incredibly supportive families and friends who can't wait to welcome a child into our extended family. Our parents are eager grandparents-in-waiting, our siblings are excited to be aunts and uncles, and our friends have already offered to babysit!",
    members: [
      {
        id: "1",
        name: "Alex's Parents",
        relationship: "Loving Grandparents",
        description: "Retired teachers who live just 20 minutes away and dream of weekend sleepovers and baking cookies with their grandchild.",
        image: grandparentsImage,
      },
      {
        id: "2",
        name: "Our Friend Group",
        relationship: "Chosen Family",
        description: "A diverse group of friends we've known for years, many with kids of their own. They're already planning playdates!",
        image: friendsGatheringImage,
      },
    ],
  },
  ourLife: {
    title: "A Glimpse Into Our Days",
    subtitle: "The rhythms and joys of everyday life",
    description: "Our life is a beautiful mix of cozy routines and exciting adventures. We believe in the magic of ordinary moments—morning pancakes on Saturdays, bedtime stories every night, and spontaneous dance parties in the kitchen. We're ready to share all of this with a child.",
    activities: [
      {
        id: "1",
        title: "Outdoor Adventures",
        description: "We love hiking, camping, and exploring nature. Maple always comes along! We can't wait to introduce a child to the wonder of catching fireflies and building campfires.",
        image: hikingAdventureImage,
      },
      {
        id: "2",
        title: "Cooking & Creating",
        description: "Our kitchen is the heart of our home. We cook together almost every night, trying new recipes and perfecting our favorites. There's always room for little helpers!",
        image: cookingTogetherImage,
      },
    ],
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
  resetData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<ProfileData>(defaultData);

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
      return newData;
    });
  }, []);

  const resetData = useCallback(() => {
    setData(defaultData);
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{
      isAdmin,
      toggleAdmin,
      data,
      updateData,
      resetData,
    }}>
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
