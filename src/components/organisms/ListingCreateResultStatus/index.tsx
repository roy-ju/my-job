import VerifyingAddress from './VerifyingAddress';
import NoAddressFound from './NoAddressFound';
import WaitingForAgentCompletion from './WaitingForAgentCompletion';
import Duplicated from './Duplicated';
import AgentSelection from './AgentSelection';
import WaitingForOwnerAgreement from './WaitingForOwnerAgreement';
import MultipleAddressesFound from './MultipleAddressesFound';
import VerifyOwnershipNotFound from './VerifyOwnershipNotFound';

const ListingCreateResultStatus = {
  VerifyingAddress,
  NoAddressFound,
  WaitingForAgentCompletion,
  Duplicated,
  AgentSelection,
  WaitingForOwnerAgreement,
  MultipleAddressesFound,
  VerifyOwnershipNotFound,
};

export default ListingCreateResultStatus;
