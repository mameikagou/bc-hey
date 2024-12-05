import { cloneElement } from 'react';
import {
  AnimatePresence,
  ColorTokens,
  TabLayout,
  Tabs,
  TabsTabProps,
  styled,
  Text,
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

const OptionButton = styled(Tabs.Tab, {
  unstyled: true,
  role: 'button',
  tabIndex: 0,
  disableActiveTheme: true,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '$roundedFull',
  cursor: 'pointer',
  borderColor: 'transparent',
  outlineColor: 'transparent',
  px: '$spacing8',
  variants: {
    fullWidth: {
      true: {
        flex: 1,
      },
    },
    size: {
      small: {
        height: '$spacing20',
        py: '$spacing2',
        px: '$padding6',
      },
      default: {
        height: '$spacing24',
        py: '$spacing2',
        px: '$padding8',
      },
      large: {
        height: '$spacing32',
        py: '$padding8',
        px: '$padding12',
      },
    },
    disabled: {
      true: {
        cursor: 'unset',
      },
      false: {
        cursor: 'pointer',
      },
    },
  } as const,
});

// 设置默认值的同时, 设置泛型
interface SegmentedControlOption<T extends string = string> {
  value: T;
  // Optional custom display element
  display?: JSX.Element;
  // Optional wrapper around the display element
  wrapper?: JSX.Element;
}

type SegmentedControlSize = 'small' | 'default' | 'large';

interface SegmentedControlProps<T extends string = string> {
  options: readonly SegmentedControlOption<T>[];
  selectedOption: T;
  onSelectOption: (option: T) => void;
  fullWidth?: boolean;
  size?: SegmentedControlSize;
  outlined?: boolean;
  disabled?: boolean;
}

export function SegmentedControl<T extends string = string>(
  props: SegmentedControlProps<T>
): JSX.Element {
  const {
    options,
    selectedOption,
    onSelectOption,
    disabled,
    outlined,
    fullWidth,
    size = 'default',
  } = props;
  return (
    <>
      <Tabs
        orientation="horizontal"
        activationMode="manual"
        value={selectedOption}
        onValueChange={(value) => {
          onSelectOption(value as T);
        }}
      >
        <TabsList>
          {options?.map((option, index) => {
            // wrapper是包裹组件，display是内部的文字样式，没传就是默认
            const { wrapper, display, value } = option;

            // 获取组件实例，方便cloneElement从而实现优化
            const optionButton = (
              <OptionButton
                disabled={disabled}
                fullWidth={fullWidth}
                key={value}
                value={value}
                size={size}
              >
                {display ?? <Text>{value}</Text>}
              </OptionButton>
            );

            if (wrapper) {
              // To avoid perf issues, we expect the callsite to pass an instance of a component,
              // not a functional component. As a result we can't render it with typical JSX and need
              // to clone it here.
              return cloneElement(wrapper, {
                props: optionButton,
              });
            }
            return optionButton;
          })}
        </TabsList>
      </Tabs>
    </>
  );
}
