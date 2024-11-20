import {
  AnimatePresence,
  ColorTokens,
  TabLayout,
  Tabs,
  TabsTabProps,
  styled,
} from 'tamagui';

const TabsList = styled(Tabs.List, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderColor: '$surface3',
  outlineWidth: 0,
  borderWidth: '$spacing1',
  gap: '$gap8',
  overflow: 'hidden',
  p: 4,
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    outlined: {
      true: {
        borderColor: '$surface3',
        borderWidth: '$spacing1',
      },
      false: {
        borderWidth: 0,
      },
    },
    size: {
      small: {
        height: 30,
        gap: '$spacing6',
        borderRadius: '$rounded16',
      },
      default: {
        height: 34,
        gap: '$gap8',
        borderRadius: '$rounded20',
      },
      large: {
        height: 42,
        gap: '$gap12',
        borderRadius: '$rounded24',
      },
    },
  } as const,
});

interface SegmentedControlProps<T extends string = string> {
  selectedOption: T;
  onSelectOption: (option: T) => void;
}

export function SegmentedControl<T extends string = string>(
  props: SegmentedControlProps
): JSX.Element {
  const { selectedOption, onSelectOption } = props;
  return (
    <>
      <Tabs
        orientation="horizontal"
        activationMode="manual"
        value={selectedOption}
        onValueChange={(value) => {
          onSelectOption(value as T);
        }}
      ><TabsList>
        </TabsList></Tabs>
    </>
  );
}
