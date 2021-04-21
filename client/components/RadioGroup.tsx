import { HStack, useRadioGroup } from '@chakra-ui/react';

// components
import { RadioCard } from 'components/RadioCard';

type Props = {
  name: string;
  options: string[];
  onChange: (value: string) => void;
};

export function RadioGroup({ name, options, onChange }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange,
    defaultValue: options[0],
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
