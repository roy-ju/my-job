import DanjiRecommendationForm from '.';

const meta = {
  title: 'organisms/DanjiRecommendationForm',
};

export default meta;

export const Danji = () => <DanjiRecommendationForm.Danji danji="제이제이 단지" />;

export const MoveInDate = () => <DanjiRecommendationForm.MoveInDate />;

export const BuyOrRent = () => <DanjiRecommendationForm.BuyOrRent value={1} />;

export const Price = () => <DanjiRecommendationForm.Price />;

// export const Area = () => <DanjiRecommendationForm.Area />;

export const Purpose = () => <DanjiRecommendationForm.Purpose />;

export const Description = () => <DanjiRecommendationForm.Description />;

export const InvestAmount = () => <DanjiRecommendationForm.InvestAmount />;
