import { useState } from 'react';

export default function useActiveTab() {
  const [activeTab, setActiveTab] = useState(0);

  return { activeTab, handleChangeTab: setActiveTab };
}
