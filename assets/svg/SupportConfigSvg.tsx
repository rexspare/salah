import React from 'react';
import { Svg, Path, Rect, Pattern, Use, Image } from 'react-native-svg';

const SupportConfigSvg = ({ fill }: { fill: string }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
    <Path d="M9.6002 1.43994C12.4514 1.43994 15.3026 1.43994 18.2402 1.43994C18.359 2.86554 18.359 2.86554 18.4802 4.31994C18.7446 5.2045 18.7446 5.2045 19.0952 5.96994C19.7751 7.72043 19.8078 9.17392 19.6802 11.0399C19.5465 10.9471 19.4129 10.8543 19.2752 10.7587C16.7075 8.94155 16.7075 8.94155 13.6802 8.63994C13.1602 8.83994 13.1602 8.83994 12.9602 9.35994C12.7752 10.345 12.7752 10.345 12.9602 11.2799C13.6514 12.0104 14.4651 12.5124 15.3602 12.9599C15.5465 13.8104 15.5557 14.5089 15.3602 15.3599C14.7059 16.3005 13.9351 17.0694 13.1094 17.8596C12.7105 18.2494 12.3319 18.6526 11.9543 19.0631C11.7047 19.3288 11.4551 19.5945 11.2052 19.8599C11.0903 19.9861 10.9755 20.1123 10.8571 20.2423C10.2506 20.8663 9.92619 21.1097 9.04988 21.2137C8.4002 21.1199 8.4002 21.1199 8.1602 20.8799C8.07113 20.2237 8.07113 20.2237 8.1602 19.4399C8.67676 18.7912 8.67676 18.7912 9.3452 18.1799C10.1823 17.4531 10.1823 17.4531 10.8002 16.5599C10.5096 16.8092 10.2198 17.0594 9.9302 17.3099C9.75447 17.4618 9.57875 17.6137 9.3977 17.7703C8.94331 18.1827 8.53938 18.609 8.1302 19.0649C7.4402 19.6799 7.4402 19.6799 6.6452 19.7849C6.0002 19.6799 6.0002 19.6799 5.7602 19.4399C5.67113 18.7837 5.67113 18.7837 5.7602 17.9999C6.27676 17.3512 6.27676 17.3512 6.9452 16.7399C7.78231 16.0131 7.78231 16.0131 8.4002 15.1199C8.09001 15.3897 7.78005 15.6598 7.4702 15.9299C7.29756 16.0803 7.12493 16.2307 6.94707 16.3856C6.62236 16.6738 6.3072 16.9729 6.0002 17.2799C5.2652 17.3249 5.2652 17.3249 4.5602 17.2799C4.3202 17.0399 4.3202 17.0399 4.2002 16.4249C4.37925 15.1939 5.1442 14.5403 6.0002 13.6799C5.7626 13.7987 5.7626 13.7987 5.5202 13.9199C4.7852 13.9499 4.7852 13.9499 4.0802 13.9199C3.8402 13.6799 3.8402 13.6799 3.8252 12.9449C3.83015 12.7123 3.8351 12.4796 3.8402 12.2399C4.21887 12.3216 4.21887 12.3216 4.6052 12.4049C5.50278 12.5485 5.50278 12.5485 6.2102 12.1949C6.75981 11.7262 6.8871 11.5066 6.9602 10.7999C7.2275 10.7306 7.4948 10.6613 7.7702 10.5899C8.64089 10.3938 8.64089 10.3938 9.1202 9.83994C9.1499 9.60234 9.1796 9.36474 9.2102 9.11994C9.2597 8.88234 9.3092 8.64474 9.3602 8.39994C9.8402 8.09994 9.8402 8.09994 10.3202 7.91994C10.6721 7.21615 10.5532 6.5573 10.5218 5.78244C10.5602 5.27994 10.5602 5.27994 11.0402 4.79994C11.0984 4.26937 11.0984 4.26937 11.0702 3.68994C11.0659 3.4938 11.0615 3.29765 11.0571 3.09557C11.0515 2.94521 11.0459 2.79485 11.0402 2.63994C10.8471 2.57559 10.6541 2.51124 10.4552 2.44494C10.2522 2.35089 10.0493 2.25684 9.8402 2.15994C9.761 1.92234 9.6818 1.68474 9.6002 1.43994Z" fill={fill} fill-opacity="0.6"/>
    <Path d="M14.6246 9C16.2515 9.04434 17.7414 10.1552 18.9596 11.145C20.111 12.6202 20.3173 13.8879 20.2768 15.7397C20.0775 17.1347 19.4381 18.2454 18.7196 19.44C18.0642 20.5344 17.7391 21.2429 17.5196 22.56C14.906 22.56 12.2924 22.56 9.59961 22.56C9.87721 21.4496 10.3709 20.9869 11.1671 20.2275C11.2994 20.098 11.4316 19.9684 11.5679 19.835C12.133 19.2816 12.7023 18.7326 13.2712 18.1832C13.6863 17.7811 14.0992 17.3769 14.5121 16.9725C14.6414 16.8492 14.7706 16.7259 14.9038 16.5989C15.5359 15.9794 15.9838 15.5379 16.0796 14.64C16.1341 14.3777 16.1885 14.1153 16.2446 13.845C16.0411 12.7535 15.7824 12.6459 14.8946 12.03C14.4914 11.7771 14.0868 11.5264 13.6796 11.28C13.4396 11.04 13.4396 11.04 13.3946 10.335C13.4556 9.33936 13.6478 9.16627 14.6246 9Z" fill={fill} fill-opacity="0.6"/>
    <Path d="M6.60035 4.19997C7.80643 4.71686 8.93914 5.35423 10.0804 5.99997C10.0906 6.47986 10.0901 6.96007 10.0804 7.43997C10.0012 7.51917 9.92195 7.59837 9.84035 7.67997C8.248 7.64535 6.41851 6.89813 5.28035 5.75997C5.22035 5.17497 5.22035 5.17497 5.28035 4.55997C6.00035 4.07997 6.00035 4.07997 6.60035 4.19997Z" fill={fill} fill-opacity="0.6"/>
    <Path d="M6.23973 6.9599C8.11018 7.87035 8.11018 7.87035 8.63973 8.3999C8.64952 8.8798 8.64994 9.36001 8.63973 9.8399C7.75337 10.0755 7.29748 10.1171 6.4291 9.78646C6.17851 9.64075 5.92791 9.49503 5.66973 9.3449C5.41542 9.20352 5.16111 9.06213 4.8991 8.91646C4.31973 8.3999 4.31973 8.3999 4.23535 7.62084C4.2632 7.40273 4.29104 7.18462 4.31973 6.9599C5.04841 6.59556 5.45022 6.75893 6.23973 6.9599Z" fill={fill} fill-opacity="0.6"/>
    <Path d="M8.59543 2.32495C9.46761 2.41046 9.90217 2.53913 10.5604 3.11995C10.6504 3.86995 10.6504 3.86995 10.5604 4.55995C10.3204 4.79995 10.3204 4.79995 9.66043 4.85995C8.77691 4.79199 8.3608 4.64369 7.68043 4.07995C7.45543 3.46495 7.45543 3.46495 7.44043 2.87995C7.92043 2.39995 7.92043 2.39995 8.59543 2.32495Z" fill={fill} fill-opacity="0.6"/>
    <Path d="M4.07992 9.6001C5.61481 9.76754 5.61481 9.76754 6.23992 10.0801C6.25013 10.56 6.24972 11.0402 6.23992 11.5201C5.99992 11.7601 5.99992 11.7601 5.30992 11.8051C4.55992 11.7601 4.55992 11.7601 3.83992 11.2801C3.77992 10.5451 3.77992 10.5451 3.83992 9.8401C3.91912 9.7609 3.99832 9.6817 4.07992 9.6001Z" fill={fill} fill-opacity="0.6"/>
    </Svg>
    
  );
};

export default SupportConfigSvg;
