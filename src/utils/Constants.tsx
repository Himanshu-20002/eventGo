import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width

export enum FONTS {
  heading = "CormorantGaramond-Medium",
  heading2 = "CormorantGaramond-Regular",
  Regular = 'Okra-Regular',
  Medium = 'Okra-Medium',
  Light = 'Okra-MediumLight',
  SemiBold = 'Okra-Bold',
  Bold = 'Okra-ExtraBold',
  ExtraBold = 'Okra-ExtraBold',
}

export enum Colors {
  primary = '#FFC201',
  active = '#000000e1',
  inactive = '#666',
  lightText = "#eee",
  background = 'transparent',
  text = '#fff',
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

