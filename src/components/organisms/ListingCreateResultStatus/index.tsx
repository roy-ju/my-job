import VerifyingAddress from './VerifyingAddress';
import NoAddressFound from './NoAddressFound';
import WaitingForAgentCompletion from './WaitingForAgentCompletion';
import Duplicated from './Duplicated';
import AgentSelection from './AgentSelection';
import OwnerConsent from './OwnerConsent';
import MultipleAddressesFound from './MultipleAddressesFound';

const ListingCreateResultStatus = {
  VerifyingAddress,
  NoAddressFound,
  WaitingForAgentCompletion,
  Duplicated,
  AgentSelection,
  OwnerConsent,
  MultipleAddressesFound,
};

export default ListingCreateResultStatus;
