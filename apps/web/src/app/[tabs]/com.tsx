'use client';

import { SegmentedControl } from '@/components/ui/SegmentedControl/SegmentedControl';
import { useState } from 'react';

export default function UniversalSwapFlow() {
  const [currentTab, setCurrentTab] = useState<string>('');

  const onTabClick = () => {};
  return (
    <>
      <SegmentedControl
        options={[{ value: '111' }]}
        selectedOption={currentTab}
        onSelectOption={onTabClick}
      />
    </>
  );
}
