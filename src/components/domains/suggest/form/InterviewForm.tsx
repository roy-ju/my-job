import InterviewField from './field/InterviewField';

import useSelectInterview from './hooks/useSelectInterview';

import forms from './constants/forms';
import Section from './ui/Section';

export default function InterviewForm() {
  const { interviewAvailabletimes, handleClickInterviewAvailabletimes } = useSelectInterview();

  return (
    <Section id={forms.INTERVIEW}>
      <InterviewField selectedList={interviewAvailabletimes} handleClick={handleClickInterviewAvailabletimes} />
    </Section>
  );
}
