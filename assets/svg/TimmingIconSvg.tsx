import { Svg, Path } from 'react-native-svg';

const TimmingIconSvg = ({ fill }: { fill: string }) => {
  return (
    <Svg width="30" height="28" viewBox="0 0 30 28" fill="none">
      <Path d="M5.6665 1.75L1.6665 5.75M28.3332 5.75L24.3332 1.75M6.99984 23.0833L4.33317 25.75M22.9998 23.0833L25.6665 25.75M14.9998 9.75V15.0833L17.6665 17.75M14.9998 25.75C17.8288 25.75 20.5419 24.6262 22.5423 22.6258C24.5427 20.6254 25.6665 17.9123 25.6665 15.0833C25.6665 12.2544 24.5427 9.54125 22.5423 7.54086C20.5419 5.54047 17.8288 4.41667 14.9998 4.41667C12.1709 4.41667 9.45775 5.54047 7.45737 7.54086C5.45698 9.54125 4.33317 12.2544 4.33317 15.0833C4.33317 17.9123 5.45698 20.6254 7.45737 22.6258C9.45775 24.6262 12.1709 25.75 14.9998 25.75Z" stroke={fill} stroke-opacity="0.7" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
};

export default TimmingIconSvg;
