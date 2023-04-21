import SuggestRegionalForm from '.';

const meta = {
  title: 'organisms/SuggestRegionalForm',
};

export default meta;

export const Region = () => <SuggestRegionalForm.Region />;

export const RealestateType = () => <SuggestRegionalForm.RealestateType />;

export const BuyOrRent = () => <SuggestRegionalForm.BuyOrRent />;

export const Price = () => <SuggestRegionalForm.Price buyOrRent={3} />;

export const Area = () => <SuggestRegionalForm.Area />;

export const Floor = () => <SuggestRegionalForm.Floor />;

export const Description = () => <SuggestRegionalForm.Description />;
