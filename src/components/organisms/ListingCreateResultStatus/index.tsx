import VerifyingAddress from './VerifyingAddress';
import NoAddressFound from './NoAddressFound';
import WaitingForAgentCompletion from './WaitingForAgentCompletion';
import Duplicated from './Duplicated';
import AgentSelection from './AgentSelection';
import OwnerConsent from './OwnerConsent';

const ListingCreateResultStatus = {
  VerifyingAddress,
  NoAddressFound,
  WaitingForAgentCompletion,
  Duplicated,
  AgentSelection,
  OwnerConsent,
};

export default ListingCreateResultStatus;
