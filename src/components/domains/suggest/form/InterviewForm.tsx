import InterviewField from './field/InterviewField';

import useSelectInterview from './hooks/useSelectInterview';

import forms from './constants/forms';

import Section from './ui/Section';

type InterviewFormProps = {
  isUpdateForm?: boolean;
};

export default function InterviewForm({ isUpdateForm = false }: InterviewFormProps) {
  const { interviewAvailabletimes, handleClickInterviewAvailabletimes } = useSelectInterview();

  return (
    <Section id={forms.INTERVIEW}>
      <InterviewField
        selectedList={interviewAvailabletimes}
        handleClick={handleClickInterviewAvailabletimes}
        isUpdateForm={isUpdateForm}
      />
    </Section>
  );
}
