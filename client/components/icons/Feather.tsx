import { Icon } from '@chakra-ui/react';

function Feather() {
  return (
    <Icon
      w={6}
      h={6}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z' />
      <line x1='16' y1='8' x2='2' y2='22' />
      <line x1='17.5' y1='15' x2='9' y2='15' />
    </Icon>
  );
}

export default Feather;
