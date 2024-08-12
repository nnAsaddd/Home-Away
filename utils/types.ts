export type NavlinksType = {
  href: string;
  label: string;
};

export type FormInputType = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export type ProfileType = {
  id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};
