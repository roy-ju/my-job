import { useContext } from "react";

import { PlatformContext } from "../provider/PlatfromProvider";

export default function usePlatform() {
  return useContext(PlatformContext);
}
